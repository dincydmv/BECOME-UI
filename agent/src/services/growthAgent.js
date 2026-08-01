/**
 * growthAgent.js — The BECOME Growth Curator Agent
 *
 * Implements the full OBSERVE → THINK → DISCOVER → CURATE → EXPLAIN pipeline.
 *
 * Combines live OpenRouter AI reasoning (gpt-4o-mini) with our 36+ video growth library
 * to generate deeply personalized recommendations with 100% working YouTube URLs.
 */

import {
  CONTENT_LIBRARY,
  CONTENT_TYPES,
  INTERVENTIONS,
  DOMAINS,
  scoreContent,
} from './contentLibrary.js'

import { getGrowthState, getRecommendationHistory, getCompletedIds } from './storage.js'

const getApiKey = () => {
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

const callOpenRouterAgent = async (profile, growthState, candidates, history, apiKey, requestedCount = 6) => {
  const interventionType = determineIntervention(growthState)

  const skippedTitles = (history || []).filter(h => h.status === 'skipped').map(h => h.title)
  const completedTitles = (history || []).filter(h => h.status === 'completed').map(h => h.title)

  const candidateSummary = candidates.map((c, i) => `[${i + 1}] ID: "${c.id}"
  Title: "${c.title}"
  Creator: ${c.creator} | Duration: ${c.duration}
  URL: ${c.url}
  Key Insight: "${c.keyInsight}"
  Description: ${c.description}`).join('\n\n')

  const systemPrompt = `You are the BECOME Personal Growth Curator Agent — a wise, highly personalized mentor that helps users become who they want to become.

Your core mission: Answer "What should this person consume today to become who they want to become?"
You optimize for Behavior Change, Follow-through, Habit Formation, and Identity Progress — NOT clicks or watch time.

You are given a database of high-quality growth videos. Select the TOP ${requestedCount} items from this candidate list that best bridge the gap between who the user is now and who they want to become.

For each selected item:
- Explain WHY THIS connects to their specific target identity (${profile?.targetTraits || 'Growth'}) and goals (${profile?.goals || 'Personal Development'}). Mention their specific traits!
- Explain WHY NOW is the right moment based on their trust score (${growthState?.trustScore ?? 50}), momentum (${growthState?.momentum || 'medium'}), and identity stage (${growthState?.identityStage || 'early'}).
- Define a clear EXPECTED OUTCOME (behavior change or practical exercise).

Respond ONLY in valid JSON matching this schema:
{
  "interventionType": "${interventionType}",
  "sessionTitle": "Personalized Session Heading",
  "sessionMessage": "Warm 2-3 sentence mentor message tailored to their identity transformation",
  "selectedIds": ["candidate_id_1", "candidate_id_2", "..."],
  "explanations": [
    {
      "id": "candidate_id_1",
      "whyThis": "Personalized rationale referencing ${profile?.name || 'you'}, your current trait of '${profile?.currentTraits?.split(',')[0] || 'growth area'}', and target goal of '${profile?.targetTraits?.split(',')[0] || 'mastery'}'...",
      "whyNow": "Personalized rationale referencing your current trust score of ${growthState?.trustScore ?? 50} and ${growthState?.momentum || 'medium'} momentum...",
      "expectedOutcome": "Specific action or behavior change expected from engaging with this content..."
    }
  ]
}`

  const userPrompt = `User Context:
- Name: ${profile?.name || 'Explorer'}
- Current Identity Traits: ${profile?.currentTraits || 'Procrastinator, easily distracted'}
- Target Identity Traits: ${profile?.targetTraits || 'Disciplined, deeply focused'}
- Active Goals: ${profile?.goals || 'Build consistent daily habits and complete creative projects'}

Growth State:
- Trust Score: ${growthState?.trustScore ?? 50}/100
- Momentum: ${growthState?.momentum || 'medium'}
- Consistency Streak: ${growthState?.consistency ?? 0} days
- Identity Stage: ${growthState?.identityStage || 'early'}

User History Context:
- Completed Content (${completedTitles.length}): ${completedTitles.slice(0, 5).join(', ') || 'None'}
- Previously Skipped (${skippedTitles.length}): ${skippedTitles.slice(0, 5).join(', ') || 'None'}

Candidate Resources:
${candidateSummary}`

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

  if (!response.ok) {
    throw new Error(`OpenRouter HTTP ${response.status}: ${await response.text()}`)
  }

  const data = await response.json()
  const rawText = data.choices[0].message.content
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
        { step: `Observing ${profile?.name || 'user'}'s profile & identity gap (${profile?.currentTraits || 'current'} → ${profile?.targetTraits || 'target'})...`, duration: 500 },
        { step: `Assessing growth state: ${growthState?.identityStage || 'early'} stage, ${growthState?.momentum || 'medium'} momentum`, duration: 600 },
        { step: `Executing OpenRouter AI LLM Personalization Engine...`, duration: 800 },
        { step: 'Scoring behavior change impact & filtering previous skips...', duration: 600 },
        { step: 'Crafting custom Why This & Why Now rationale for your goals...', duration: 500 },
        { step: 'AI Curation complete ✓', duration: 400 },
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
    whyThis: `Connecting your current trait (${profile?.currentTraits?.split(',')[0] || 'growth area'}) to your target identity (${profile?.targetTraits?.split(',')[0] || 'focused'}). ${item.description?.split('.')[0] || ''}.`,
    whyNow: growthState?.momentum === 'low' || (growthState?.trustScore !== undefined && growthState.trustScore < 40)
      ? `Your momentum is building back up — this ${item.type.toLowerCase()} is designed for a quick, impactful win.`
      : `At your ${growthState?.identityStage || 'current'} stage, ${item.creator}'s insights reinforce your daily practice.`,
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
        { step: `Assessing growth state: ${growthState?.identityStage || 'early'} stage, ${growthState?.momentum || 'medium'} momentum`, duration: 600 },
        { step: `Selected intervention type: ${interventionType}`, duration: 700 },
        { step: 'Scoring 36+ growth videos on behavior change potential...', duration: 600 },
        { step: 'Curation complete ✓', duration: 400 },
      ]
    }
  }
}

export const runGrowthAgent = async (profile, growthState, count = 6) => {
  const apiKey = getApiKey()
  const completedIds = getCompletedIds()
  const history = getRecommendationHistory()

  let candidates = CONTENT_LIBRARY.filter(item => !completedIds.includes(item.id))

  if (apiKey) {
    try {
      console.log(`🤖 Running BECOME Personalization Engine for ${count} videos via OpenRouter AI...`)
      return await callOpenRouterAgent(profile, growthState, candidates, history, apiKey, count)
    } catch (err) {
      console.warn('OpenRouter API call failed, running local engine fallback:', err.message)
    }
  }

  return runLocalAgent(profile, growthState, candidates, count)
}
