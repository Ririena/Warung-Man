import React from "react";

const withLayout = (Page, Layout) => {
    return function WrappedPage(props) {
        return (
            <Layout>
                <Page {...props} />
            </Layout>
        );
    };
};

export default withLayout;
