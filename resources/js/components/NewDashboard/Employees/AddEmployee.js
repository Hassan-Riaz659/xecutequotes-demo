import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import $ from 'jquery';

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



var baseUrl = window.location.origin;
var uploadCloud = baseUrl+"/public/landingImages/uploadCloud.png";


export default class AddEmployee2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
      
      files: [
        
      ]
    };
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
    }


    render() {
        return (
            <div>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/employees2"><i className="fas fa-long-arrow-alt-left"/></Link> Add Employees</h4>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">

                                            <form action="/action_page.php">
                                               
                                               <div className="form-group upload-img-col">
                                               <span className="upload-img-logo">
                                               <img src={uploadCloud}/> 
                                               <p>Drop or <a href="#">upload your file</a></p>
                                               </span>
                                               <label>Profile Picture</label>
                                               <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={true}
          allowReorder={true}
          maxFiles={3}
          server="/api"
          name="files" 
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
        
        </div>

                                                <div className="form-group col-md-6 col-12 pl-0">
                                                <label>First name</label>
                                                <input type="text" className="form-control" />
                                                </div>

                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="emial" className="form-control" />

                                                </div>

                                                <div className="form-group">
                                                    <label>Phone Number</label>
                                                    <input type="number" className="form-control" />

                                                </div>

                                                <button type="button" className="btn next-btn">Add Employee</button>


                                            </form>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>


                        <DashboardFooter />
                    </div>


                </div>
            </div>
        )
    }
}
