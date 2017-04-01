define("backToTopButton",["lodash","core","santaProps"],function(a,b,c){"use strict";var d=b.compMixins;var e=1136;var f=2500;return{displayName:"BackToTopButton",mixins:[d.skinBasedComp],propTypes:{windowScrollEventAspect:c.Types.SiteAspects.windowScrollEvent.isRequired,isZoomed:c.Types.mobile.isZoomed.isRequired,isMobileDevice:c.Types.Device.isMobileDevice.isRequired},statics:{useSantaTypes:true},getInitialState:function(){return{visible:false}},componentWillMount:function(){var a=this.props.windowScrollEventAspect;a.registerToScroll(this)},componentDidMount:function(){this.hideButton=a.debounce(a.partial(this.setState,{visible:false}),f,{leading:false,trailing:true})},onScroll:function(a,b){var c=this.props.isZoomed()&&this.props.isMobileDevice;if(b==="UP"&&a.y>e&&!c){this.hideButton();if(!this.state.visible){this.setState({visible:true})}}},getSkinProperties:function(){return{bg:{className:this.classSet({visible:this.state.visible})}}}}});