from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import boto3
import anthropic
import os
from typing import Dict, Any
import json

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AWS Textract client
textract = boto3.client('textract')

# Initialize Anthropic client
claude = anthropic.Client(api_key=os.getenv("ANTHROPIC_API_KEY"))

@app.post("/api/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)) -> Dict[str, Any]:
    try:
        # Read file content
        file_content = await file.read()
        
        # Call Amazon Textract
        response = textract.detect_document_text(
            Document={'Bytes': file_content}
        )
        
        # Extract text from Textract response
        extracted_text = ' '.join([item['Text'] for item in response['Blocks'] if item['BlockType'] == 'LINE'])
        
        # Prepare prompt for Claude
        prompt = f"""You are an ATS (Applicant Tracking System) analyzing a resume. Please analyze the following resume text and provide:
1. A score from 0-100
2. Key strengths
3. Areas for improvement
4. Specific recommendations
5. Missing keywords or skills that might be important for the role

Resume text:
{extracted_text}

Please format your response as a JSON object with the following structure:
{{
    "score": number,
    "strengths": string[],
    "improvements": string[],
    "recommendations": string[],
    "missing_keywords": string[]
}}"""

        # Get analysis from Claude
        message = claude.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            temperature=0.7,
            system="You are an expert ATS system that analyzes resumes and provides constructive feedback.",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
        
        # Parse Claude's response
        analysis = json.loads(message.content[0].text)
        
        return analysis

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 