import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import List from './components/Blog/List';
import MenuLeft from './components/Layout/MenuLeft';
import Register from './components/Member/Register';
import Show from './components/Product/Show';
import Detail from './components/Product/Detail';
import Add from './components/Product/Add';
function App(props) {
  return (
    <>
      <Head />
      <section >
        <div className="container">
          <div className="row">
            <MenuLeft />
            {this.props.children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
export default App;
