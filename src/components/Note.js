import React, {Component, PropTypes} from 'react';

import SummernoteEditor from '../components/SummernoteEditor';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object,
    onChange: PropTypes.func,
  };

  state = {
  }

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange();
    }
  };

  render () {
    const note = this.props.note;
    let content = note ? note.Content : '';
    return (
      <div className="note">
      <SummernoteEditor
        value={content}
        options={{
          dialogsInBody: true,
          lang: "en-US",
          minHeight: 300,
          toolbar: [
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['link', 'picture']],
            ['view', ['codeview']]
          ],
          popover: {
            image: [],
            link: [],
            air: [],
          },
          // defaultFontName: 'Helvetica Neue',
          fontNames: [
            'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
          ],
          fontNamesIgnoreCheck: [
            'Arial', 'Courier New', 'Helvetica Neue', 'Lucida Sans', 'Tahoma', 'Times New Roman'
          ],
          fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'],
        }}
        onChange={this.onChange}
      />
      </div>
    );
  }
}

export default Note;
