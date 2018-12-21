import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import posed from 'react-pose'

import Slide from './slide'
import { isBrowser } from '../admin/services/auth'

const AnimatedSlide = posed(Slide)({
  display: {
    opacity: 1,
    z: 1,
    transition: {
      default: {
        duration: 500,
      },
    },
  },
  hidde: {
    opacity: 0,
    z: 0,
    transition: {
      default: {
        duration: 500,
      },
    },
  },
})

class Slideshow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      slides: [],
      currentSlideIndex: 0,
      numSlides: 0,
      screenHeight: 0,
    }
    this.nextSlide = this.nextSlide.bind(this)
  }

  componentDidMount() {
    if (isBrowser) {
      this.setState({
        slides: this.props.slides,
        numSlides: this.props.slides.length,
        screenHeight: window.innerHeight,
      })
    }
    console.log(this.props.slides.length)
    this.interval = setInterval(this.nextSlide, this.props.duration)
  }

  componentDidUpdate(prevProps) {
    if (this.props.slides.length !== prevProps.slides.length) {
      this.setState({
        slides: this.props.slides,
        numSlides: this.props.slides.length,
      })
    }
  }

  nextSlide() {
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
    const currentSlideIndex = this.state.currentSlideIndex
    return (
      <div style={{ backgroundColor: 'black' }}>
        {this.state.slides.map((post, i) => (
          <AnimatedSlide
            pose={currentSlideIndex === i ? 'display' : 'hidde'}
            post={post}
            key={i}
            height={this.state.screenHeight}
          />
        ))}
      </div>
    )
  }
}

export default Slideshow

Slideshow.propTypes = {
  duration: PropTypes.number,
  slides: PropTypes.array,
}
