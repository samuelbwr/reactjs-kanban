var Board = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
       this.loadBoardFromFile();
       console.log('componentDidMount');
       // caso quiser sempre verificar por mudanças
       setInterval(this.loadBoardFromFile(), this.props.refreshInterval)
    },
    loadBoardFromFile: function(){
         $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
              console.log("loading from file");
              this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    saveBoardToFile: function(newData){
        this.setState({data: newData});
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          type: 'POST',
          data: JSON.stringify(newData),
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    addPostIt: function(postIt){
        var postits = this.state.data;
        var newPostits = postits.concat([postIt]);
        saveBoardToFile(newPostits);
    },
    changePostIt: function(id, field, text){
        for(var i =0; i< this.state.data.length, postIt = this.state.data[i]; i++){
            if(postIt.id===id){
                postIt[field] = text;
                return;
            }
        }
    },
    updatePostIt: function(id, field, text){
        changePostIt(id, field,text);
        saveBoardToFile(this.state.data);
    },
    
    getPostItByPhase: function(phase){
        if(this.state.data!=null && this.state.data.length>0){
            return this.state.data.reduce(function(result, current){
                if(phase === current.phase){
                  result.push(current);
                }
                return result;
            }, []);
        }
        return null;
    },
    render: function(){
        console.log('render');
        return (
            <div className="board">
                <Phase name="To-do"
                    updatePostItText="this.updatePostItText"
                    updatePostItPhase="this.updatePostItText"
                    postIts={this.getPostItByPhase('todo')}/>
                <Phase name="Doing"
                    updatePostItText="this.updatePostItText"
                    updatePostItPhase="this.updatePostItText"
                    postIts={this.getPostItByPhase('doing')}/>
                <Phase name="Done"
                    updatePostItText="this.updatePostItText"
                    updatePostItPhase="this.updatePostItText"
                    postIts={this.getPostItByPhase('done')}/>
                    <button className="add-post-it mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                      <i className="material-icons">add</i>
                    </button>
            </div>
            
       )
    }
})