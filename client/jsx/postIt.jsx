var PostIt = React.createClass({
  saveChangesToFile: function(id, text){
   
  },
  updateJson: function(id, text){
    
    saveChangesToFile(id,text);
  },
  saveChanges: function(e){
    var text = React.findDOMNode(this.refs.text);
    var id = React.findDOMNode(this.refs.id);
    console.log('Saving: '+text+" in "+id);
    updateJson(id,text);
  },
  render: function() {
    var rawText = marked(this.props.postIt.text.toString(), {sanitize: true});
    return (
      <div className="post-it mdl-card mdl-shadow--2dp">
        <div className="post-it-header">
          <span className="post-it-id">#<span ref="id">{this.props.postIt.id}</span></span>
          <span className="post-it-author">{this.props.postIt.author}</span>
        </div>
        <div className="post-it-text" ref="text" contentEditable="true" onBlur={this.saveChanges()}
              placeholder="O que você deve fazer?"
              dangerouslySetInnerHTML={{__html: rawText}}></div>
        <div className="post-it-footer">{this.props.postIt.creationDate}</div>
      </div>
    );
  }
});