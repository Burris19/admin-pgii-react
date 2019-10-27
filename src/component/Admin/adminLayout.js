import React, { Component } from 'react'
import Navbar from '../nav/nav'
const AdminLayout = WrappedComponent => {
    class HOC extends Component {
        render() {
            return (
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Navbar />
                            <div className="container-fluid">
                                <WrappedComponent {...this.props} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
    return HOC;
};

export default AdminLayout;