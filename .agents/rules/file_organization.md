# Workspace File Organization Rule

## Auto-Organization Workflow
Whenever the user adds, uploads, or sends a new file into the root of `Thesis workplace`, immediately and automatically move and organize it into its corresponding category folder based on file type:

* **PDF Documents (`.pdf`)** $\rightarrow$ `PDF_Documents/`
* **Word Documents (`.docx`, `.doc`)** $\rightarrow$ `Word_Documents/`
* **Markdown Notes & Guides (`.md`)** $\rightarrow$ `Markdown_Notes/`
* **Text Data & Drafts (`.txt`, `.csv`)** $\rightarrow$ `Text_Files/`
* **Python Scripts (`.py`)** $\rightarrow$ `Python_Scripts/`
* **Media & Visual Assets (`.png`, `.jpg`, `.jpeg`, `.svg`)** $\rightarrow$ `Assets/`

## Constraints
- Keep the root of `Thesis workplace` completely clean of loose files.
- Never touch or relocate system/project directories: `.agents/`, `POC/`, `prelims/`.
- Maintain clickable markdown links pointing to the new organized file path in all agent responses.
