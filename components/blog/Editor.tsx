import React from 'react'
import FroalaEditorComponent from 'react-froala-wysiwyg';

interface Props {
  content: string;
  setContent: (content: string) => void;
}

const Editor = ({ content, setContent }: Props) => {

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
        <FroalaEditorComponent
          tag="textarea"
          config={{
            placeholderText: 'Start typing...',
            charCounterCount: true,
            theme: 'gray',
            language: 'en',
            height: 500,
            fontSize: ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'],
            toolbarButtons: [
              'paragraphFormat','bold', 'italic', 'underline', 'strikeThrough', '|',
              'fontSize', 'fontFamily', 'textColor','|',
              'formatUL', 'formatOL', 'insertLink', '|',
              'codeView', 'html', 'undo', 'redo', 'clearFormatting', '|',
              'align', 'insertTable', 'quote', 'insertHR'
            ],
            paragraphFormat: {
              N: 'Normal',
              H1: 'Heading 1',
              H2: 'Heading 2',
              H3: 'Heading 3',
              H4: 'Heading 4',
              H5: 'Heading 5',
              H6: 'Heading 6',
            },

            colorsText: [
              '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
              '#FFA500', '#800080', '#00FFFF', '#FFC0CB', '#FFFFFF'
            ],
            colorsBackground: [
              '#FFFFFF', '#F8F9FA', '#F1F3F5', '#DEE2E6', '#CED4DA',
              '#ADB5BD', '#6C757D', '#495057', '#343A40', '#212529'
            ],
            linkAlwaysBlank: true,
          }}
          model={content}
          onModelChange={handleEditorChange}
        />
    </>
  )
}

export default Editor