import React, { Component } from "react";
// import { render } from "react-dom";
import Nav from "./Nav";
import Header from "./Header";
import Write from "./Write";
import CanvasDraw from "./Plan/src/";
import classNames from "./Plan/src/index.css";
var axios = require("axios");


class Page extends Component {
    state = {
      color: "#ffc600",
      width: 600,
      height: 700,
      brushRadius: 10,
      lazyRadius: 12,
      title: "",
      body: ""
    };
    componentDidMount() {
     
      window.setInterval(() => {
        this.setState({
          color: "#000000"
        });
      });

      axios.get("/pages/:id").then( page => {
        console.log("we got here");
        console.log(JSON.stringify(page))
      }).catch(err=> console.log(err));

    };
    


render() {
    return(
    
        
        <section className="main">
        <Nav/>
            <Header/>
            <div className="row">
            <div className="col-md-2">
                <div className="list-group">
                <span className="list-group-item active main-color-bg">Dashboard</span>
                <span className="glyphicon glyphicon-list" aria-hidden="true"></span>  Pages <span className="badge">12</span>
                </div>
                </div>
               
            <div className="col-md-5">
                <Write/>
            
            <div style={{height: "400px"}}></div>
            </div>

            <div className="container">
            <div className="row">
            <div className="col-md-4">
        <h2>Plan</h2>
        <div className={classNames.tools}>
        <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            New
          </button>
          <button
            onClick={() => {
              localStorage.setItem(
                "savedDrawing",
                this.saveableCanvas.getSaveData()
              );
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.clear();
            }}
          >
            Clear
          </button>
          <button
            onClick={() => {
              this.saveableCanvas.undo();
            }}
          >
            Undo
          </button>
          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={this.state.brushRadius}
              onChange={e =>
                this.setState({ brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Lazy-Radius:</label>
            <input
              type="number"
              value={this.state.lazyRadius}
              onChange={e =>
                this.setState({ lazyRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
          brushColor={this.state.color}
          brushRadius={this.state.brushRadius}
          lazyRadius={this.state.lazyRadius}
          canvasWidth={this.state.width}
          canvasHeight={this.state.height}
        />
        <button
          onClick={() => {
            this.loadableCanvas.loadSaveData(
              localStorage.getItem("savedDrawing")
            );
          }}
        >
          Load what you saved previously into the following canvas. Either by
          calling `loadSaveData()` on the component's reference or passing it
          the `saveData` prop:
        </button>
        <CanvasDraw
          ref={canvasDraw => (this.loadableCanvas = canvasDraw)}
          saveData={localStorage.getItem("savedDrawing")}
        />
      </div>
      </div>
      </div>
      </div>
    


        </section>
    );
}
}

export default Page;