import React from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import EditableHTML from 'corespring-editable-html';

require('./feedback.less');

export default class FeedbackSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feedback: this.props.feedback,
      feedbackType: this.props.feedbackType
    }
  }
  
  feedbackTypeChange(event, feedbackType) {
    this.setState({feedbackType: feedbackType});
    this.onChange({
      feedbackType: feedbackType,
      feedback: this.state.feedback
    });
  }

  feedbackChange(feedback) {
    this.setState({feedback: feedback});
    this.onChange({
      feedbackType: this.state.feedbackType,
      feedback: feedback
    });
  }

  onChange(feedback){
    this.props.onChange(feedback);
  }

  render() {
    return <div className="feedback-selector">
      <p className="feedback-prompt">{this.props.label}</p>
      <RadioButtonGroup 
          style={{ display: 'flex' }} name="feedback" defaultSelected="default" 
          valueSelected={this.state.feedbackType}
          onChange={this.feedbackTypeChange.bind(this)}>
        <RadioButton style={{ width: 'auto' }} value="default" label="Simple Feedback" />
        <RadioButton style={{ width: 'auto' }} value="none" label="No Feedback" />
        <RadioButton style={{ width: 'auto' }} value="custom" label="Customized Feedback" />
      </RadioButtonGroup>
      {
        (this.state.feedbackType === 'custom') ? (
          <div className="feedback-holder">
            <EditableHTML 
              placeholder="Enter feedback..."
              onChange={this.feedbackChange.bind(this)} 
              model={this.state.feedback}/>
          </div>
        ) : (
          (this.state.feedbackType === 'default') ? (
            <div className="feedback-holder default">{this.props.defaultFeedback}</div>
          ) : (
            <div></div>
          )
        )
      }
    </div>;
  }

}
