define("mediaZoom/mediaZoom/svgShapesData",[],function(){"use strict";return{buttonClose:{svg:{viewBox:"0 0 180 180",className:"svgButtonClose"},content:'<path d="M5 5 L175 175 M175 5 L5 175"/>'},buttonPrevious:{svg:{viewBox:"0 0 180 310",className:"svgNavButton"},content:'<path d="M170 10 L10 161 M10 150 L170 300"/>'},buttonNext:{svg:{viewBox:"0 0 180 310",className:"svgNavButton"},content:'<path d="M10 10 L170 161 M170 150 L10 300"/>'}}});define("mediaZoom",["zepto","react","lodash","core","mediaZoom/mediaZoom/svgShapesData","reactDOM","santaProps","image","imageZoomDisplayer","experiment"],function(a,b,c,d,e,f,g,h,i,j){"use strict";var k=d.compMixins;var l={width:240,height:60};var m={width:0,height:0};function n(a){return a&&!a.target.href}function o(a){return a.isMobileDevice||a.isTabletDevice}return{displayName:"MediaZoom",mixins:[k.skinBasedComp,k.animationsMixin,k.skinInfo,d.compMixins.galleryImageExpandedActionMixin],propTypes:c.assign({styleId:g.Types.Component.styleId.isRequired,isZoomAllowed:g.Types.RenderFlags.isZoomAllowed.isRequired,isMobileDevice:g.Types.Device.isMobileDevice.isRequired,isTabletDevice:g.Types.Device.isTabletDevice.isRequired,rootNavigationInfo:g.Types.Component.rootNavigationInfo.isRequired,navigateToPage:g.Types.navigateToPage.isRequired,passClickEvent:g.Types.passClickEvent.isRequired,exitFullScreenMode:g.Types.exitFullScreenMode.isRequired,enterFullScreenMode:g.Types.enterFullScreenMode.isRequired,getPrevAndNextStateFunc:b.PropTypes.func,isDataChangedFunc:b.PropTypes.func,getChildCompFunc:b.PropTypes.func,getBoxDimensionsFunc:b.PropTypes.func,actualNavigateToItemFunc:b.PropTypes.func,closeFunction:b.PropTypes.func},g.santaTypesUtils.getSantaTypesByDefinition(h),g.santaTypesUtils.getSantaTypesByDefinition(i)),statics:{useSantaTypes:true},getSvg:function(a){var d=e[a];var f=c.clone(d.svg);var g=this.props.styleId+"_";c.assign(f,{className:g+d.svg.className,dangerouslySetInnerHTML:{__html:d.content}});return b.DOM.svg(f)},getInitialState:function(){this.isAnimating=false;this.shouldUpdateSizeOnLayout=true;var a="desktop";if(this.props.isMobileDevice){a="mobile"}else if(this.props.isTabletDevice){a="tablet"}return c.assign({$buttonsState:"showButtons",$device:a},this.props.getPrevAndNextStateFunc())},componentWillReceiveProps:function(a){if(!this.props.isZoomAllowed){setTimeout(this.closeMediaZoom,0);return}var b=this.props.isDataChangedFunc(this.props,a);this.shouldUpdateSizeOnLayout=b;if(b){this.setState(this.props.getPrevAndNextStateFunc())}},getSkinProperties:function(){var a=!!this.state.next;var b=a?{}:{display:"none"};var c=o(this.props)?m:l;var d=this.props.getChildCompFunc({toggleButtons:this.toggleButtons,goToNextItem:this.clickOnNextButton,goToPrevItem:this.clickOnPreviousButton},c);var e={"":{"data-width-spacer":c.width,"data-height-spacer":c.height},blockingLayer:{onClick:this.onBlockingLayerClick},xButton:{onClick:this.closeMediaZoom,children:[this.getSvg("buttonClose")]},dialogBox:{onClick:this.handleDialogBoxClick},itemsContainer:{children:d},buttonPrev:{onClick:this.clickOnPreviousButton,style:b,children:[this.getSvg("buttonPrevious")]},buttonNext:{onClick:this.clickOnNextButton,style:b,children:[this.getSvg("buttonNext")]}};if(o(this.props)){e.blockingLayer.onSwipeLeft=this.clickOnNextButton;e.blockingLayer.onSwipeRight=this.clickOnPreviousButton}return e},onBlockingLayerClick:function(a){if(n(a)){this.closeMediaZoom();a.preventDefault();a.stopPropagation()}},componentDidLayout:function(){var b=this.props.getBoxDimensionsFunc();var c={width:b.dialogBoxWidth,height:b.dialogBoxHeight,"margin-top":b.marginTop,"margin-left":b.marginLeft,padding:b.padding};var d={width:b.dialogBoxWidth,height:b.dialogBoxHeight,marginTop:b.marginTop,marginLeft:b.marginLeft,padding:b.padding};if(!this.shouldUpdateSizeOnLayout){a(f.findDOMNode(this.refs.dialogBox)).css(c);return}this.shouldUpdateSizeOnLayout=false;var e=this;var g=this.sequence();g.add("dialogBox","BaseDimensions",.5,0,{to:d}).add("itemsContainer","FadeIn",.5,0).onCompleteAll(function(){e.unBlockNavigation();e.handleImageExpandedAction()}).execute()},clickOnNextButton:function(a){this.navigateToOtherPageWithAnimations(this.state.next);if(a){a.preventDefault();a.stopPropagation()}},clickOnPreviousButton:function(a){this.navigateToOtherPageWithAnimations(this.state.prev);if(a){a.preventDefault();a.stopPropagation()}},navigateToOtherPageWithAnimations:function(a){if(this.isNavigationBlocked()){return}var b=this;this.blockNavigation();this.animate("itemsContainer","FadeOut",.5,0,null,{onComplete:function(){b.props.actualNavigateToItemFunc(a)}})},closeMediaZoom:function(){if(this.props.closeFunction){this.props.closeFunction()}else{if(j.isOpen("sv_dpages")){var a=c.omit(this.props.rootNavigationInfo,["imageZoom","pageItemId","title"]);this.props.navigateToPage(a);return}this.props.navigateToPage({pageId:this.props.rootNavigationInfo.pageId})}},handleDialogBoxClick:function(a){if(n(a)){a.preventDefault();a.stopPropagation();this.props.passClickEvent(a)}},unBlockNavigation:function(){this.isAnimating=false},blockNavigation:function(){this.isAnimating=true},isNavigationBlocked:function(){return this.isAnimating},componentDidMount:function(){this.props.enterFullScreenMode()},componentWillUnmount:function(){this.props.exitFullScreenMode()},toggleButtons:function(a){var b=this.state.$buttonsState==="showButtons"?"hideButtons":"showButtons";this.setState({$buttonsState:b});if(a){a.preventDefault();a.stopPropagation()}}}});