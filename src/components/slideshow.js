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
    this.state = { slides: [], currentSlide: 0, numSlides: 0 }
  }

  componentDidMount() {
    this.setState({
      slides: this.props.children,
      numSlides: this.props.children.length,
    })
    this.interval = setInterval(() => {
      if (this.state.currentSlide + 1 < this.state.numSlides) {
        this.setState({ currentSlide: this.state.currentSlide + 1 })
      } else {
        this.setState({ currentSlide: 0 })
      }
    }, this.props.duration)
  }

  componentDidUpdate(prevProps) {
    if (this.props.children.length !== prevProps.children.length)
      //Quan rebo nous children, es a dir que s'ha actualitzat
      this.setState({
        slides: this.props.children,
        numSlides: this.props.children.length,
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    console.log(this.props.children)
    const currentSlide = this.state.currentSlide

    return (
      <div style={{ backgroundColor: 'black' }}>
        <PoseGroup>
          <SlideAnimatedContainer key={this.state.currentSlide}>
            {this.props.children[currentSlide]}
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
