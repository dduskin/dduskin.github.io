const imgUrls = ['https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_wind_probs_34_F120+png/205140.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_earliest_reasonable_toa_no_wsp_34+png/205140_earliest_reasonable_toa_no_wsp_34.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_wind_history+png/205140_wind_history.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_5day_cone_no_line_and_wind+png/205140_5day_cone_no_line_and_wind.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_3day_cone_with_line_and_wind+png/205140_3day_cone_with_line_and_wind.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL032020_peak_surge+png/205140_peak_surge.png', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL0320WPCQPF+gif/205140WPCQPF_sm.gif', 'https://www.nhc.noaa.gov/storm_graphics/AT03/refresh/AL0320WPCERO+gif/205140WPCERO_sm.gif'];


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentIndex: null };
    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderImageContent = this.renderImageContent.bind(this);
  }
  renderImageContent(src, index) {
    return (
      React.createElement("div", { onClick: e => this.openModal(e, index) },
      React.createElement("img", { src: src, key: src })));


  }
  openModal(e, index) {
    this.setState({ currentIndex: index });
  }
  closeModal(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState({ currentIndex: null });
  }
  findPrev(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex - 1 }));

  }
  findNext(e) {
    if (e != undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      currentIndex: prevState.currentIndex + 1 }));

  }
  render() {
    return (
      React.createElement("div", { className: "gallery-container" },
      React.createElement("h1", null, "TROPICAL STORM CRISTOBAL"),
      React.createElement("div", { className: "gallery-grid" },
      imgUrls.map(this.renderImageContent)),

      React.createElement(GalleryModal, {
        closeModal: this.closeModal,
        findPrev: this.findPrev,
        findNext: this.findNext,
        hasPrev: this.state.currentIndex > 0,
        hasNext: this.state.currentIndex + 1 < imgUrls.length,
        src: imgUrls[this.state.currentIndex] })));



  }}


class GalleryModal extends React.Component {
  constructor() {
    super();
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnMount() {
    document.body.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown(e) {
    if (e.keyCode === 27)
    this.props.closeModal();
    if (e.keyCode === 37 && this.props.hasPrev)
    this.props.findPrev();
    if (e.keyCode === 39 && this.props.hasNext)
    this.props.findNext();
  }
  render() {
    const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
    if (!src) {
      console.log('whut');
      return null;
    }
    return (
      React.createElement("div", null,
      React.createElement("div", { className: "modal-overlay", onClick: closeModal }),
      React.createElement("div", { isOpen: !!src, className: "modal" },
      React.createElement("div", { className: "modal-body" },
      React.createElement("a", { href: "#", className: "modal-close", onClick: closeModal, onKeyDown: this.handleKeyDown }, "\xD7"),
      hasPrev && React.createElement("a", { href: "#", className: "modal-prev", onClick: findPrev, onKeyDown: this.handleKeyDown }, "\u2039"),
      hasNext && React.createElement("a", { href: "#", className: "modal-next", onClick: findNext, onKeyDown: this.handleKeyDown }, "\u203A"),
      React.createElement("img", { src: src })))));




  }}


ReactDOM.render(React.createElement(Gallery, null), document.querySelector('.gallery-container'));