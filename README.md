# Honolulu Arrest Logs

A searchable database of recent Honolulu Police Department arrest records. Data is extracted from PDF arrest logs published by HPD, updated every 15 minutes.

### Multi-LLM Extraction Pipeline

The backend (private repository) uses a concurrence-based approach to ensure accuracy when parsing PDF data:

1. **Triple Extraction** - Each field is extracted 3 times by separate LLMs (Gemini 3 Flash).
2. **Concurrence Check** - If all 3 extractions match, the value is accepted (high confidence).
3. **Arbiter** - If extractions disagree, a separate LLM (Gemini 3 Pro) reviews all 3 results against the source PDF and determines the correct value.
4. **Auditor** - An adversarial LLM (Gemini 3 Pro) scrutinizes the arbiter's decision to actively look for errors and only approves if completely correct.

This treats LLM extraction like a verification pipeline: independent workers, a supervisor to resolve disputes, and QA to catch supervisor mistakes. Rather than trusting a single extraction, the concurrence model catches errors before data is stored.
