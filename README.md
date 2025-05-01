# Resume ATS Scanner

A modern web application that uses OCR and AI to analyze resumes and provide ATS-style feedback. Built with Python (FastAPI), TypeScript (React), Amazon Textract, and Claude AI.

## Features

- PDF resume upload with drag-and-drop interface
- OCR processing using Amazon Textract
- AI-powered resume analysis using Claude
- Detailed feedback including:
  - Overall resume score
  - Key strengths
  - Areas for improvement
  - Specific recommendations
  - Missing keywords

## Prerequisites

- Python 3.8+
- Node.js 16+
- AWS Account with Textract access
- Anthropic API key for Claude

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
ANTHROPIC_API_KEY=your_anthropic_api_key
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd resume-scanner
```

2. Set up the backend:
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
cd backend
uvicorn main:app --reload
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

## Usage

1. Open http://localhost:3000 in your browser
2. Drag and drop a PDF resume or click to select one
3. Wait for the analysis to complete
4. Review the detailed feedback and recommendations

## Technologies Used

- Backend:
  - FastAPI
  - Amazon Textract
  - Claude AI
  - Python 3.8+

- Frontend:
  - React
  - TypeScript
  - Chakra UI
  - React Dropzone
  - Axios

## License

MIT 