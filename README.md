# BECOME

An AI-powered personalized media curation platform that helps users discover the right knowledge, media, and experiences based on their goals, habits, and evolving identity.

Unlike traditional recommendation systems that optimize for engagement and watch time, this platform continuously learns from user behavior and curates content that supports long-term personal growth.

---

## Problem Statement

Modern recommendation systems are designed to maximize attention.

They predict what users are most likely to click, watch, or consume next, often leading to passive scrolling rather than meaningful learning.

The challenge addressed by this project is:

> **How might we design an agentic AI curator that deeply understands an individual's aspirations, habits, and evolving identity—and continuously curates the most relevant media, knowledge, and experiences to help them become the person they imagine?**

---

## Solution

This project introduces an AI Growth Curator that maintains a persistent understanding of every user.

Instead of recommending content solely based on previous clicks, the system considers:

- Current identity
- Desired identity
- Personal goals
- Learning preferences
- Historical interactions
- Growth progress
- Previous recommendations

The AI then determines what type of intervention the user needs before selecting the most appropriate media.

---

## Features

### Identity-Based Onboarding

Users define:

- Current traits
- Desired traits
- Personal goals
- Learning style
- Preferred media

This initializes the user's growth profile.

---

### AI Growth Curator

The recommendation engine acts as an AI agent rather than a traditional recommender.

It:

- Understands user context
- Maintains persistent memory
- Reasons about the user's current growth stage
- Chooses the appropriate intervention
- Curates personalized media
- Learns from user interactions

---

### Personalized Curated Feed

Recommendations include:

- Videos
- Podcasts
- Books
- Articles
- Experts
- Challenges
- Reflection prompts

Every recommendation explains:

- Why this?
- Why now?
- Expected outcome

---

### Persistent Memory

The system continuously updates a user's growth profile based on their interactions.

Tracked attributes include:

- Trust score
- Momentum
- Consistency
- Growth stage
- Preferred learning style
- Recommendation history

This enables recommendations to evolve over time.

---

### Growth Dashboard

Users can monitor their progress through:

- Identity evolution
- Momentum
- Consistency
- Activity history
- Personalized growth journey

---

## AI Workflow

```text
Observe User
      │
      ▼
Load Identity
      │
      ▼
Load Growth Memory
      │
      ▼
Analyze Recent Activity
      │
      ▼
Reason About Current State
      │
      ▼
Choose Growth Intervention
      │
      ▼
Curate Personalized Media
      │
      ▼
Explain Recommendations
      │
      ▼
Update User Memory
```

---

## Recommendation Strategy

The AI does not immediately recommend content.

It first determines what type of intervention is most beneficial for the user's current state.

Possible interventions include:

- Learn
- Reflect
- Act
- Connect

Once the intervention has been selected, the system curates the most relevant content from the media library.

---

## System Architecture

```text
                 User
                   │
                   ▼
        Identity & Goals
                   │
                   ▼
     Persistent Growth Memory
                   │
                   ▼
       Behavior Analysis
                   │
                   ▼
        AI Growth Curator
                   │
                   ▼
 Personalized Recommendation Engine
                   │
                   ▼
       Curated Media Feed
                   │
                   ▼
          User Interaction
                   │
                   └──────────► Updates Memory
```

---

## Technology Stack

### Frontend

- React
- Tailwind CSS

### Backend

- Node.js
- Express
- TypeScript

### AI

- Anthropic Claude API

### Database

- Supabase

---

## Project Structure

```text
.
├── frontend/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   │   ├── agent/
│   │   ├── memory/
│   │   └── recommendation/
│   ├── prompts/
│   └── database/
│
└── README.md
```

---

## Future Improvements

- Adaptive learning paths
- AI mentor conversations
- Calendar integration
- Habit tracking
- Community recommendations
- Voice-based coaching
- Long-term behavioral analytics

---

## Vision

The objective of this project is to demonstrate how recommendation systems can move beyond optimizing attention and instead support intentional personal growth through persistent memory, behavioral understanding, and agentic AI.

Rather than asking:

> *"What will this person watch next?"*

the system asks:

> *"What does this person need today to become the person they aspire to be?"*
