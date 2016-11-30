var React = require('react');
var AddProduct = require('../components/AddProduct.js')

var HandleAddProduct = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitalState: function () {
    return ({
      name: '',
      description: '',
      categories: '',
      cost_min: '',
      cost_expected: '',
      deadline: '',
      picture: ''
    })
  },

  OnName: function (e) {
    this.setState({
      name: e.target.value
    })
  },

  OnDescription: function (e) {
    this.setState({
      description: e.target.value
    })
  },

  OnCategory: function (e) {
    this.setState({
      categories: e.target.value
    })
  },

  OnCostMin: function (e) {
    this.setState({
      cost_min: e.target.value
    })
  },

  OnCostExpected: function (e) {
    this.setState({
      cost_expected: e.target.value
    })
  },

  OnDeadline: function (e) {
    this.setState({
      deadline: e.target.value
    })
  },

  OnPicture: function (e) {
    this.setState({
      picture: e.target.value
    })
  },

  removeFile: function () {
    this.setState( { fileName : "" } )
    $("#removeFileAddReward").css("visibility", "hidden")
    $('#hiddenFileImgChooser').val("")
    $("#image").attr("src","")
  },

  importFile: function () {
    this.setState( { fileName :   $('#hiddenFileImgChooser')[0].files[0].name  } )
    $("#removeFileAddReward").css("visibility", "visible")
    e.preventDefault()
  },

  OnClick: function () {
    var form = new FormData();
    form.append("name", $("#nameToSet").val());
    form.append("description", $("#descriptionToSet").val());
    form.append("categories", $("#categoryToSet").val());
    form.append("cost_min", $("#costMinToSet").val());
    form.append("cost_expected", $("#expectedToSet").val());
    form.append("picture", $('#hiddenFileImgChooser')[0].files[0]);
    form.append("deadline", $("#dateToSet").val());

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:7770/api/product",
      "method": "POST",
      "headers": {
        "token": getCookie("token"),
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
      var res = JSON.parse(response)
        if (res.meta.success === 1) {
          $("#nameToSet").val('')
          $("#categoryToSet").val('')
          $("#descriptionToSet").val('')
          $("#costMinToSet").val('')
          $("#expectedToSet").val('')
          $("#dateToSet").val('')
          $("#removeFileAddReward").click()
          PNotify.removeAll();
            new PNotify({
                title: 'Success!',
                text: "Success!",
                type: 'success',
                delay: 1500
            });
        } else {
          PNotify.removeAll();
            new PNotify({
                title: 'Error',
                text: res.meta.message,
                type: 'error'
            });
        }
      });
  },

  render: function () {
    return (
      <AddProduct
        OnName={this.UpdateName}
        OnCategory={this.UpdateCategory}
        OnCostMin={this.UpdateCostMin}
        OnCostExpected={this.UpdateCostExpected}
        OnDeadline={this.UpdateDeadline}
        OnDescription={this.UpdateDescription}
        OnPicture={this.fileName}
        removeFile={this.removeFileClick}
        importFile={this.handleImportFile}
        OnClick={this.handleClick} />
    )
  }
})

module.exports = HandleAddProduct;
