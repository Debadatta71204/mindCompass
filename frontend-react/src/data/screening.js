export const QUESTIONS = {
  dementia: [
    { domain: 'Memory', text: 'Do you (or does someone you support) frequently misplace items in unusual places, or repeat the same question or story within a short time period without realising it?' },
    { domain: 'Language', text: 'Are there noticeable difficulties finding the right word mid-conversation, or substituting incorrect or vague words for familiar terms (e.g., calling a \'watch\' a \'time thing\')?' },
    { domain: 'Executive Function', text: 'Has it become significantly harder to plan multi-step tasks such as managing household bills, preparing a complex meal, or following a schedule that previously felt routine?' },
    { domain: 'Perceptual-Motor Skills', text: 'Are there new difficulties with spatial orientation — such as getting disoriented in familiar environments, misjudging distances, or struggling to navigate a well-known route?' },
    { domain: 'Independence Impact', text: 'Do the changes in thinking or memory create meaningful interference with the ability to manage daily tasks independently (e.g., finances, appointments, self-care)?' },
  ],
  adhd: [
    { domain: 'Inattention', text: 'Is it frequently difficult to sustain focused attention on tasks or activities — such as losing track of details, making careless errors, or becoming easily sidetracked?' },
    { domain: 'Hyperactivity', text: 'Is there a persistent sense of physical or mental restlessness — such as fidgeting, difficulty remaining seated when expected to, or feeling driven \'like a motor\' that can\'t slow down?' },
    { domain: 'Impulsivity', text: 'Are there recurring difficulties with impulsivity — such as blurting out answers before questions are finished, interrupting others\' conversations, or making quick decisions without considering consequences?' },
    { domain: 'Cross-Setting Presence', text: 'Do the attention or behaviour patterns appear consistently across two or more settings (e.g., both at home AND at school or work), rather than only in one specific environment?' },
    { domain: 'Timeline / Age of Onset', text: 'Were noticeable signs of inattention, hyperactivity, or impulsivity first observed before the age of 12 years?' },
  ],
  mci: [
    { domain: 'Episodic Memory', text: 'Have you noticed a gradual, subtle change in your ability to recall recent events, appointments, or conversations — even when trying — compared to how memory felt a few years ago?' },
    { domain: 'Processing Speed', text: 'Does it seem to take noticeably longer to follow fast-paced conversations, process new information, or respond in situations that previously felt easy and automatic?' },
    { domain: 'Attention Modulation', text: 'Has there been an increased vulnerability to distraction or a harder time shifting attention between tasks when compared to your cognitive baseline from earlier years?' },
    { domain: 'Compensatory Strategy Use', text: 'Do you find yourself relying more heavily on external aids — such as written reminders, phone notes, calendar alerts, or asking others to repeat information — to compensate for memory slips?' },
    { domain: 'Preserved Autonomy', text: 'Despite any mild cognitive changes you may notice, are you completely capable of managing all daily activities independently (finances, driving, appointments, household tasks)?' },
  ],
};

export const SCORE_PROFILES = {
  dementia: [
    { max: 3, label: 'Low Concern', description: 'Your responses indicate few of the informational markers associated with this track. Continue monitoring and maintain regular general health check-ups.' },
    { max: 6, label: 'Moderate Profile', description: 'Your responses suggest a moderate number of informational markers. While this is not diagnostic, it may be worthwhile discussing your observations with a qualified healthcare professional.' },
    { max: 10, label: 'Elevated Profile', description: 'Your responses indicate several informational markers present across multiple domains. We strongly recommend arranging a consultation with a Geriatrician or Neurologist for a comprehensive professional evaluation.' },
  ],
  adhd: [
    { max: 3, label: 'Low Concern', description: 'Your responses indicate few of the informational markers associated with this track. If you have specific concerns, a brief conversation with a general practitioner is a good starting point.' },
    { max: 6, label: 'Moderate Profile', description: 'Your responses suggest a moderate number of informational markers. Consider discussing environmental accommodation strategies with a Psychiatrist or Pediatrician.' },
    { max: 10, label: 'Elevated Profile', description: 'Your responses indicate several informational markers across multiple DSM-5 domains. Professional evaluation by a Psychiatrist or Developmental Pediatrician is recommended for a thorough assessment.' },
  ],
  mci: [
    { max: 3, label: 'Low Concern', description: 'Your responses suggest minimal informational markers. Some mild cognitive shifts are a natural part of normal aging. Stay cognitively active and attend routine health reviews.' },
    { max: 6, label: 'Moderate Profile', description: 'Your responses suggest some informational markers that may warrant attention. Consider scheduling a cognitive screening with your general practitioner for a baseline comparison.' },
    { max: 10, label: 'Elevated Profile', description: 'Your responses indicate several informational markers. Given that MCI can have variable trajectories, a professional evaluation by a Neurologist or Geriatric Specialist is advisable for personalised guidance.' },
  ],
};

export function getScoreProfile(score, disorder) {
  const bands = SCORE_PROFILES[disorder] || SCORE_PROFILES.mci;
  return bands.find((b) => score <= b.max) || bands[bands.length - 1];
}

export const TRACK_META = {
  dementia: { label: 'Dementia / Major NCD', icon: '\u{1F9E0}' },
  adhd: { label: 'ADHD', icon: '\u26A1' },
  mci: { label: 'MCI', icon: '\u{1F331}' },
};
