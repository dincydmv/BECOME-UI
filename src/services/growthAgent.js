/**
 * growthAgent.js — The BECOME Growth Curator Agent
 *
 * Implements the full OBSERVE → THINK → DISCOVER → CURATE → EXPLAIN pipeline.
 *
 * Uses Google Gemini AI / OpenRouter AI to generate deeply personalized YouTube recommendations
 * tailored precisely to what the user inputs want (profile traits, goals, learning style, preferred media).
 */

import {
  CONTENT_LIBRARY,
  CONTENT_TYPES,
  INTERVENTIONS,
  DOMAINS,
  scoreContent,
} from './contentLibrary.js'

import { getGrowthState, getRecommendationHistory, getCompletedIds } from './storage.js'

const getGeminiKey = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env.VITE_GEMINI_API_KEY) {
      return process.env.VITE_GEMINI_API_KEY
    }
  } catch (e) {}
  return null
}

const getOpenRouterKey = () => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_OPENROUTER_API_KEY) {
      return import.meta.env.VITE_OPENROUTER_API_KEY
    }
  } catch (e) {}
  try {
    if (typeof process !== 'undefined' && process.env && process.env.VITE_OPENROUTER_API_KEY) {
      return process.env.VITE_OPENROUTER_API_KEY
    }
  } catch (e) {}
  return null
}

const determineIntervention = (growthState) => {
  const { trustScore, momentum, lastIntervention, identityStage } = growthState || {}
  if ((trustScore !== undefined && trustScore < 40) || momentum === 'low') return INTERVENTIONS.ACT
  if (trustScore > 75 && identityStage === 'advanced') return INTERVENTIONS.CONNECT
  const rotationMap = {
    [INTERVENTIONS.LEARN]: INTERVENTIONS.REFLECT,
    [INTERVENTIONS.REFLECT]: INTERVENTIONS.ACT,
    [INTERVENTIONS.ACT]: INTERVENTIONS.CONNECT,
    [INTERVENTIONS.CONNECT]: INTERVENTIONS.LEARN,
    null: INTERVENTIONS.LEARN,
  }
  if (identityStage === 'early' && !lastIntervention) return INTERVENTIONS.LEARN
  return rotationMap[lastIntervention] ?? INTERVENTIONS.LEARN
}

/**
 * Call Google Gemini REST API to dynamically curate YouTube recommendations
 */
const callGeminiAgent = async (profile, growthState, candidates, history, apiKey, requestedCount = 6) => {
  const interventionType = determineIntervention(growthState)

  const skippedTitles = (history || []).filter(h => h.status === 'skipped').map(h => h.title)
  const completedTitles = (history || []).filter(h => h.status === 'completed').map(h => h.title)

  const candidateSummary = candidates.map((c, i) => `[${i + 1}] ID: "${c.id}"
  Title: "${c.title}"
  Creator: ${c.creator} | Duration: ${c.duration}
  URL: ${c.url}
  Key Insight: "${c.keyInsight}"
  Description: ${c.description}`).join('\n\n')

  const prompt = `You are the BECOME Personal Growth Curator Agent powered by Google Gemini.
Your core mission: Answer "What should this person consume today to become who they want to become?"

User Profile & Preferences:
- User Name: ${profile?.name || 'Explorer'}
- Current Traits: ${profile?.currentTraits || 'Procrastinator, easily distracted'}
- Target Identity: ${profile?.targetTraits || 'Disciplined, deeply focused'}
- Goals: ${profile?.goals || 'Build consistent daily study habits and master deep work'}
- Preferred Learning Style: ${Array.isArray(profile?.learningStyle) ? profile.learningStyle.join(', ') : profile?.learningStyle || 'visual'}
- Preferred Media Format: ${Array.isArray(profile?.preferredMedia) ? profile.preferredMedia.join(', ') : profile?.preferredMedia || 'video'}

Growth State:
- Trust Score: ${growthState?.trustScore ?? 50}/100
- Momentum: ${growthState?.momentum || 'medium'}
- Identity Stage: ${growthState?.identityStage || 'early'}

User History:
- Completed (${completedTitles.length}): ${completedTitles.slice(0, 5).join(', ') || 'None'}
- Skipped (${skippedTitles.length}): ${skippedTitles.slice(0, 5).join(', ') || 'None'}

Select the TOP ${requestedCount} YouTube items from this candidate list that best bridge the gap between who the user is now and who they want to become:
${candidateSummary}

Respond ONLY in valid JSON with this exact schema (no markdown, no code block backticks):
{
  "interventionType": "${interventionType}",
  "sessionTitle": "Personalized Session Heading",
  "sessionMessage": "Warm 2-3 sentence mentor message tailored to their identity transformation",
  "selectedIds": ["candidate_id_1", "candidate_id_2", "..."],
  "explanations": [
    {
      "id": "candidate_id_1",
      "whyThis": "Personalized rationale referencing ${profile?.name || 'you'}, current trait '${profile?.currentTraits?.split(',')[0] || 'growth area'}', and target '${profile?.targetTraits?.split(',')[0] || 'focused'}'...",
      "whyNow": "Personalized rationale referencing trust score ${growthState?.trustScore ?? 50} and ${growthState?.momentum || 'medium'} momentum...",
      "expectedOutcome": "Specific action or behavior change expected..."
    }
  ]
}`

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Gemini API HTTP ${response.status}: ${await response.text()}`)
  }

  const data = await response.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) throw new Error('Empty response from Gemini API')

  const parsed = JSON.parse(rawText.replace(/```json\n?|\n?```/g, '').trim())

  const selectedRecs = (parsed.selectedIds || []).map((id, idx) => {
    const candidate = candidates.find(c => c.id === id) || candidates[idx] || candidates[0]
    const exp = (parsed.explanations || []).find(e => e.id === id) || (parsed.explanations || [])[idx] || {}

    return {
      ...candidate,
      id: candidate.id || `rec_${Date.now()}_${idx}`,
      rank: idx + 1,
      whyThis: exp.whyThis || `Supports your target identity of ${profile?.targetTraits || 'growth'}.`,
      whyNow: exp.whyNow || `Ideal for your ${growthState?.identityStage || 'current'} stage and ${growthState?.momentum || 'current'} momentum.`,
      expectedOutcome: exp.expectedOutcome || candidate.expectedOutcome,
      status: 'pending',
    }
  })

  return {
    engineType: 'Gemini AI Curator Engine',
    recommendations: selectedRecs.slice(0, requestedCount),
    reasoning: {
      interventionType: parsed.interventionType || interventionType,
      identityStage: growthState?.identityStage || 'early',
      trustScore: growthState?.trustScore ?? 50,
      momentum: growthState?.momentum || 'medium',
      sessionTitle: parsed.sessionTitle || `${interventionType} Growth Session`,
      sessionMessage: parsed.sessionMessage || `Welcome ${profile?.name || 'Explorer'}. Here are your personalized growth recommendations curated by Gemini AI.`,
      thinkingSteps: [
        { step: `Observing ${profile?.name || 'user'}'s profile (${profile?.currentTraits || 'current'} → ${profile?.targetTraits || 'target'})...`, duration: 500 },
        { step: `Assessing growth state & user goals: "${profile?.goals || 'habit building'}"...`, duration: 600 },
        { step: `Executing Gemini AI LLM Personalization Engine...`, duration: 800 },
        { step: 'Scoring YouTube content match & filtering previous skips...', duration: 600 },
        { step: 'Crafting custom Why This & Why Now rationale for your goals...', duration: 500 },
        { step: 'Gemini AI Curation complete ✓', duration: 400 },
      ]
    }
  }
}

/**
 * Call OpenRouter API fallback
 */
const callOpenRouterAgent = async (profile, growthState, candidates, history, apiKey, requestedCount = 6) => {
  const interventionType = determineIntervention(growthState)
  const candidateSummary = candidates.map((c, i) => `[${i + 1}] ID: "${c.id}"
  Title: "${c.title}" | Creator: ${c.creator} | Duration: ${c.duration}
  URL: ${c.url}
  Key Insight: "${c.keyInsight}"`).join('\n\n')

  const systemPrompt = `You are the BECOME Personal Growth Curator Agent. Answer "What should this person consume today to become who they want to become?"
Respond ONLY in valid JSON matching schema:
{
  "interventionType": "${interventionType}",
  "sessionTitle": "Personalized Session Heading",
  "sessionMessage": "Warm 2-3 sentence mentor message",
  "selectedIds": ["candidate_id_1", "candidate_id_2"],
  "explanations": [{"id": "candidate_id_1", "whyThis": "...", "whyNow": "...", "expectedOutcome": "..."}]
}`

  const userPrompt = `User Profile: Name: ${profile?.name}, Current: ${profile?.currentTraits}, Target: ${profile?.targetTraits}, Goals: ${profile?.goals}
Candidates:\n${candidateSummary}`

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Title': 'BECOME Growth Curator',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    }),
  })

  if (!response.ok) throw new Error(`OpenRouter HTTP ${response.status}`)
  const data = await response.json()
  const parsed = JSON.parse(data.choices[0].message.content.replace(/```json\n?|\n?```/g, '').trim())

  const selectedRecs = (parsed.selectedIds || []).map((id, idx) => {
    const candidate = candidates.find(c => c.id === id) || candidates[idx] || candidates[0]
    const exp = (parsed.explanations || []).find(e => e.id === id) || (parsed.explanations || [])[idx] || {}
    return {
      ...candidate,
      id: candidate.id || `rec_${Date.now()}_${idx}`,
      rank: idx + 1,
      whyThis: exp.whyThis || candidate.description,
      whyNow: exp.whyNow || `Ideal for your ${growthState?.identityStage || 'current'} stage.`,
      expectedOutcome: exp.expectedOutcome || candidate.expectedOutcome,
      status: 'pending',
    }
  })

  return {
    engineType: 'OpenRouter AI (GPT-4o-mini)',
    recommendations: selectedRecs.slice(0, requestedCount),
    reasoning: {
      interventionType: parsed.interventionType || interventionType,
      identityStage: growthState?.identityStage || 'early',
      trustScore: growthState?.trustScore ?? 50,
      momentum: growthState?.momentum || 'medium',
      sessionTitle: parsed.sessionTitle || `${interventionType} Growth Session`,
      sessionMessage: parsed.sessionMessage || `Welcome ${profile?.name || 'Explorer'}. Here are your personalized growth recommendations.`,
      thinkingSteps: [
        { step: `Observing ${profile?.name || 'user'}'s profile & identity gap...`, duration: 500 },
        { step: `Executing Personalization Engine...`, duration: 800 },
        { step: 'Crafting custom Why This & Why Now rationale...', duration: 500 },
        { step: 'Curation complete ✓', duration: 400 },
      ]
    }
  }
}

const runLocalAgent = (profile, growthState, candidates, requestedCount = 6) => {
  const interventionType = determineIntervention(growthState)
  const scored = candidates.map(item => ({
    item,
    score: scoreContent(item, {
      goals: profile?.goals || '',
      currentTraits: profile?.currentTraits || '',
      targetTraits: profile?.targetTraits || '',
    })
  })).sort((a, b) => b.score - a.score)

  const topItems = scored.slice(0, requestedCount).map(s => s.item)

  const recommendations = topItems.map((item, idx) => ({
    ...item,
    id: item.id || `local_rec_${idx}`,
    rank: idx + 1,
    whyThis: `Connecting your current trait (${profile?.currentTraits?.split(',')[0] || 'growth area'}) to your target identity (${profile?.targetTraits?.split(',')[0] || 'focused'}).`,
    whyNow: `At your ${growthState?.identityStage || 'current'} stage, ${item.creator}'s insights reinforce your daily practice.`,
    expectedOutcome: item.expectedOutcome,
    status: 'pending',
  }))

  return {
    engineType: 'Local Personalization Engine',
    recommendations,
    reasoning: {
      interventionType,
      identityStage: growthState?.identityStage || 'early',
      trustScore: growthState?.trustScore ?? 50,
      momentum: growthState?.momentum || 'medium',
      sessionTitle: `${interventionType}: Personalized Growth Path`,
      sessionMessage: `Welcome ${profile?.name || 'Explorer'}. Here are your curated growth videos.`,
      thinkingSteps: [
        { step: 'Observing user profile & identity traits...', duration: 500 },
        { step: `Assessing growth state: ${growthState?.identityStage || 'early'} stage`, duration: 600 },
        { step: 'Scoring 36+ growth videos on behavior change potential...', duration: 600 },
        { step: 'Curation complete ✓', duration: 400 },
      ]
    }
  }
}

export const runGrowthAgent = async (profile, growthState, count = 6) => {
  const geminiKey = getGeminiKey()
  const openRouterKey = getOpenRouterKey()
  const completedIds = getCompletedIds()
  const history = getRecommendationHistory()

  let candidates = CONTENT_LIBRARY.filter(item => !completedIds.includes(item.id))

  if (geminiKey) {
    try {
      console.log(`🤖 Running Gemini AI Curator Engine for ${count} YouTube videos...`)
      return await callGeminiAgent(profile, growthState, candidates, history, geminiKey, count)
    } catch (err) {
      console.warn('Gemini API call failed, falling back to OpenRouter/Local:', err.message)
    }
  }

  if (openRouterKey) {
    try {
      console.log(`🤖 Running OpenRouter AI Engine for ${count} YouTube videos...`)
      return await callOpenRouterAgent(profile, growthState, candidates, history, openRouterKey, count)
    } catch (err) {
      console.warn('OpenRouter API call failed, running local engine fallback:', err.message)
    }
  }

  return runLocalAgent(profile, growthState, candidates, count)
}
