import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import posed, { PoseGroup } from 'react-pose'

const SlideAnimatedContainer = posed.div({
  enter: {
    opacity: 1,
    scale: 1,
    z: 1,
    transition: {
      default: {
        duration: 500,
        ease: 'linear',
      },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    z: 0,
    delay: 250,
    transition: {
      default: {
        duration: 250,
        ease: 'linear',
      },
    },
  },
})

class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.state = { slides: [], currentSlideIndex: 0, numSlides: 0 }
    this.nextSlide = this.nextSlide.bind(this)
  }

  componentDidMount() {
    this.setState({
      slides: this.props.children,
      numSlides: this.props.children.length,
    })
    this.interval = setInterval(this.nextSlide, this.props.duration)
  }

  componentDidUpdate(prevProps) {
    if (this.props.children.length !== prevProps.children.length) {
      this.setState({
        slides: this.props.children,
        numSlides: this.props.children.length,
      })
    }
  }

  nextSlide(prevState) {
    if (this.state.currentSlideIndex + 1 < this.state.numSlides) {
      const currentSlideIndex = this.state.currentSlideIndex
      this.setState({ currentSlideIndex: currentSlideIndex + 1 })
    } else {
      this.setState({ currentSlideIndex: 0 })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const currentSlide = this.state.slides[this.state.currentSlideIndex]

    return (
      <div style={{ backgroundColor: 'black' }}>
        <PoseGroup>
          <SlideAnimatedContainer key={this.state.currentSlideIndex}>
            {currentSlide}
          </SlideAnimatedContainer>
        </PoseGroup>
      </div>
    )
  }
}

export default Slideshow

Slideshow.propTypes = {
  duration: PropTypes.number,
}
