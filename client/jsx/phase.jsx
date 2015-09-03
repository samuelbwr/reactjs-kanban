var Phase = React.createClass({
    render: function(){
        return (
            <div className="phase">
              <h4>
                {this.props.name}
              </h4>
              <div className="post-its">
                  {this.props.postIts != null && this.props.postIts.map(function(postIt){
                    return <PostIt postIt={postIt} key={postIt.id}></PostIt>   
                  })}
              </div>
            </div>
        );
    }
})