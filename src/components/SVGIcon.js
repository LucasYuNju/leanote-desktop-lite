import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class SVGIcon extends Component {
  static propTypes = {
    svgName: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.number,
  };

  static defaultProps = {
    size: 16,
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      className,
      size,
      svgName,
    } = this.props;
    const useTag = `<use xlink:href="svgs/sprite.svg#${svgName}"></use>`;
    // <img className="iconic iconic-md" src={`svgs/${svgName}.svg`} />
    // 图片，不能调样式
  
    // <object
    //   type="image/svg+xml"
    //   data={`svgs/${svgName}.svg`} 
    //   className={classNames('svg-icon', className, svgName + '-icon')}>
    // </object>
    // 样式必须是inline的style

    // <svg
    //   viewBox="0 0 128 128"
    //   width={128}
    //   height={128}
    //   className={classNames('svg-icon iconic iconic-folder', className, svgName + '-icon')}
    //   dangerouslySetInnerHTML={{__html: useTag }}
    // />
  
    return (
      <object
        type="image/svg+xml"
        data={`svgs/${svgName}.svg`} 
        className={classNames('svg-icon', className, svgName + '-icon')}>
      </object>
    );
  }
}

export default SVGIcon;
