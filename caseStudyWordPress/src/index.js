
import Header from "./header.js";

const e = React.createElement;

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, city: "Enter City Name", footerContent: "Enter Diary footer content" };
  }

  handleCity = (event) => {
    this.setState({city: event.target.value});
  }

  handleFooterContent = (event) => {
    this.setState({footerContent: event.target.value});
  } 

  handleSubmit = () => {
    $.post('http://localhost/wp-admin/options-general.php?page=diary-setting', this.state, (data, status) => {
      console.log('index.js: ' + data);
    }, 'json');
  }

  render() {
    return e(
      'div',
      {id: "cswp-setting"},
      e('p', {id: "cswp-setting-header"}, "CSWP Diary Setting"),
      e('div', {id: "cswp-form-footer-content"}, 
        e('div', {id: "cswp-form-footer-content-text"},e(MaterialUI.TextField, {       
        label: "Enter Diary footer content",
        value: this.state.footerContent,
        variant: 'standard', 
        onChange: this.handleFooterContent
        }, null),),
        e('div', {id: "cswp-form-footer-content-city",}, e(MaterialUI.TextField, { 
        label: "Enter City Name", 
        variant: 'standard', 
        value: this.state.city, 
        onChange: this.handleCity
      }, null),),
        e(MaterialUI.Button, { id: "cswp-form-footer-content-submit", variant: 'contained', onClick: this.handleSubmit}, 'Submit'),
      ),
    );
  }
}



const root = ReactDOM.createRoot(document.getElementById('cswp-case-study-wordpress'));

root.render(e(MyComponent));
