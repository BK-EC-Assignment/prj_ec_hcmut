var React = require('react');
var ReactRouter = require('react-router');
var PropTypes = React.PropTypes;

function AddProduct (props) {
  return (
    <div className="row">
      <div className="col-lg-7 giftNameGroup">
        <h2>Thêm Sản Phẩm</h2>
        <div className="form-group">
          <label htmlFor="nameToSet">Product name*:</label>
          <input type="text"
                 className="form-control"
                 id="nameToSet"
                 placeholder="Product Name"
                 onChange={props.UpdateName}
                 value={props.name} />
        </div>
        <div className="form-group">
          <label htmlFor="categoryToSet">Category*:</label>
          <input type="text"
                 className="form-control"
                 id="categoryToSet"
                 placeholder="category"
                 onChange={props.UpdateCategory}
                 value={props.categories} />
        </div>
        <div className="form-group">
          <label htmlFor="costMinToSet">Cost min*:</label>
          <input type="text"
                 className="form-control"
                 id="costMinToSet"
                 placeholder="Cost min"
                 onChange={props.UpdateCostMin}
                 value={props.cost_min}  />
        </div>
        <div className="form-group">
          <label htmlFor="expectedToSet">Cost expected*:</label>
          <input type="text"
                 className="form-control"
                 id="expectedToSet"
                 placeholder="Cost expected"
                 onChange={props.UpdateCostExpected}
                 value={props.cost_expected} />
        </div>
        <div className="form-group">
          <label htmlFor="dateToSet">Deadline*:</label>
          <input type="date"
                 className="form-control"
                 id="dateToSet"
                 placeholder="Deadline"
                 onChange={props.UpdateDeadline}
                 value={props.deadline}/>
        </div>
      </div>
      <div className="col-lg-5 uploadImageGroup">
        <div className="col-lg-4">
          <div className="form-group">
            <div className= "importImgArea">
              <label htmlFor="imgUpload">Image*:</label>
              <span id="imgUpload" className="btn">upload</span><br/>
              <span id = "fileName">{props.fileName}&nbsp;</span>
              <span id="removeFileAddReward" onClick = {props.removeFileClick}>&#10006;</span>
            </div>
            <input type="file" id="hiddenFileImgChooser" onChange = {props.handleImportFile} accept="image/*" />
          </div>
        </div>
        <div className="col-lg-8">
          <img id="image" />
        </div>
      </div>
      <div className="form-group col-lg-12 descriptionGroup">
        <label htmlFor="descriptionToSet">Description:</label>
        <textarea type="text"
                  className="form-control"
                  id="descriptionToSet"
                  placeholder="Description"
                  rows="7"
                  onChange={props.UpdateDescription}
                  value={props.description}>
        </textarea>
      </div>
      <button className="btn col-md-2 col-md-push-9" id="addRewardBtn" onClick={props.handleClick} >Save</button>
    </div>
  )
}

AddProduct.PropTypes = {
  UpdateName: PropTypes.func.isRequired,
  UpdateCategory: PropTypes.func.isRequired,
  UpdateCostMin: PropTypes.func.isRequired,
  UpdateCostExpected:PropTypes.func.isRequired,
  UpdateDeadline: PropTypes.func.isRequired,
  fileName:PropTypes.func.isRequired,
  removeFileClick: PropTypes.func.isRequired,
  handleImportFile: PropTypes.func.isRequired,
  UpdateDescription: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  cost_min: PropTypes.string.isRequired,
  cost_expected: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

module.exports = AddProduct;
