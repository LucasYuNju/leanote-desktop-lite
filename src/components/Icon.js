import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.number,
  };

  static defaultProps = {
    onClick: () => {},
    size: 16,
  }

  render() {
    const {
      className,
      iconName,
      onClick,
      size,
    } = this.props;
    const useTag = `<use xlink:href="svgs/sprite.svg#${iconName}"></use>`;
    // <img className="iconic iconic-md" src={`svgs/${iconName}.svg`} />
    // 图片，不能调样式
  
    // <object
    //   type="image/svg+xml"
    //   data={`svgs/${iconName}.svg`} 
    //   className={classNames('svg-icon', className, iconName + '-icon')}>
    // </object>
    // 样式必须是inline的style

    // <svg
    //   viewBox="0 0 128 128"
    //   width={128}
    //   height={128}
    //   className={classNames('svg-icon iconic iconic-folder', className, iconName + '-icon')}
    //   dangerouslySetInnerHTML={{__html: useTag }}
    // />
  
    return (
      <span
        className={classNames('oi', 'icon', className, iconName + '-icon')}
        data-glyph={iconName}
        onClick={onClick}
        title="icon name"
        aria-hidden="true"
      />
  );
  }
}

export default Icon;
