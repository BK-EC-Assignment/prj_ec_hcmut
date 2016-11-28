var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var PropTypes = React.PropTypes;

var EditProduct = React.createClass({
  getInitialState: function() {
    return {
      token: getCookie("token"),
      picture: '',
			name: '',
			description: '',
			cost_min: '',
			cost_expected: '',
			date: '',
			cost: '',
			deadline: '',
			timeline: '',
      time: ''
    }
  },

  render: function () {
    <div id="editReward">
      <div className="modal fade" id="editRewardModal" role="dialog">
        <div className="col-md-10 col-md-push-2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body row">
              <div className="col-lg-7 giftNameGroup">
                <div className="form-group">
                  <label htmlFor="nameToSet">Gift name*:</label>
                  <input type="text" className="form-control" id="nameToEdit" placeholder="Gift Name" value={this.state.rewardname} onChange={this.changeName}/>
                </div>
                <div className="form-group">
                  <label htmlFor="pointsToSet">Points*:</label>
                  <input type="text" className="form-control" id="pointsToEdit" placeholder="Points" value={this.state.rewardpoints} onChange={this.changePoint} />
                </div>
              </div>
              <div className="col-lg-5 uploadImageGroup">
                <div className="col-lg-4">
                  <div className="form-group">
                    <div className = "importImgArea">
                      <label htmlFor="imgUploadEdit">Image*:</label>
                      <span id="imgUploadEdit" className="btn">upload</span>
                      <br/>
                      <span id= "fileName">{this.state.fileName}&nbsp;</span>
                      <span id="removeFileEdit" onClick = {this.removeFileClick}>&#10006;</span>
                    </div>
                    <input type="file" id="hiddenFileImgChooserEdit" onChange = {this.handleImportFile} accept="image/*" />
                  </div>
                </div>
                <div className="col-lg-8">
                  <img id="imageEdit" src={this.props.initialRewardToEdit.picture} />
                </div>
              </div>
              <div className="form-group col-lg-12 descriptionGroup">
                <label htmlFor="descriptionToSet">Description:</label>
                <textarea type="text" className="form-control" id="descriptionToEdit" placeholder="Description" rows="7" value={this.state.rewarddescription}   onChange={this.changeDescription}></textarea>
              </div>
              <button className="btn col-md-2 col-md-push-9" id="editRewardBtn" onClick={this.handleClick} >Save</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  }
})
