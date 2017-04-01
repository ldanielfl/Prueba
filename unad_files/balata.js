define("balata",["react","lodash","santaProps","core","utils","backgroundCommon"],function(a,b,c,d,e,f){"use strict";var g=d.compMixins;var h=e.containerBackgroundUtils;var i=e.balataConsts;var j={comp:"wysiwyg.viewer.components.background.bgMedia",skin:"skins.viewer.bgMedia.bgMediaSkin",style:"bgMedia",ref:i.MEDIA};var k={comp:"wysiwyg.viewer.components.background.bgOverlay",skin:"skins.viewer.bgOverlay.bgOverlaySkin",style:"bgOverlay",ref:i.OVERLAY};var l={comp:"wysiwyg.viewer.components.background.bgOverlay",skin:"skins.viewer.bgOverlay.bgOverlaySkin",style:"bgColor",ref:i.BG_COLOR};function m(a,c,d){var e=c[i[a]]||{};var f=b.get(d,["transforms",a],{});var g=b.merge({},e,f);var h={};if(g.opacity){h.opacity=g.opacity;g=b.omit(g,"opacity")}if(!b.isEmpty(g)){h.transform=b.reduce(g,function(a,b,c){a+=c+"("+b+") ";return a},"")}return h}function n(a,b,c,d){var e={skin:j.skin,styleId:j.style};var f={style:m(i.MEDIA,c,b),id:a.id+j.ref,ref:j.ref,bgEffectName:d,fittingType:c.fittingType,alignType:c.alignType,mediaTransforms:c.mediaTransforms,enableVideo:a.enableVideo,notifyMediaState:a.notifyMediaState,mediaQuality:a.mediaQuality,setMediaAPI:a.setMediaAPI};return this.createChildComponent(c.mediaRef,j.comp,e,f)}function o(a,b,c,d){var e={skin:k.skin,styleId:k.style};var f={style:m(i.OVERLAY,c,b),colorOverlay:c.colorOverlay,colorOverlayOpacity:c.colorOverlayOpacity,imageOverlay:c.imageOverlay,bgEffectName:d,id:a.id+k.ref,ref:k.ref};return this.createChildComponent(null,k.comp,e,f)}function p(a,b,c,d){var e={skin:l.skin,styleId:l.style};var f={style:m(i.UNDERLAY,c,b),colorOverlay:c.color,colorOverlayOpacity:c.colorOpacity,bgEffectName:d,id:a.id+l.ref,ref:l.ref};return this.createChildComponent(null,l.comp,e,f)}function q(a){var b=a.mediaRef;var c=a.imageOverlay||a.colorOverlay;var d=a.showOverlayForMediaType||"WixVideo";var e=b&&(d==="all"||d===b.type);return!!(c&&e)}function r(a){return b.get(a.compDesign,"background",b.get(a.compData,"background",{}))}function s(a,c){var d=r(a);if(b.isEmpty(d)){return null}var e=h.getBgEffectName(a.compBehaviors,a.isDesktopDevice,a.isMobileView);var f=[];f.push(p.call(this,a,c,d,e));if(!b.isEmpty(d.mediaRef)){f.push(n.call(this,a,c,d,e))}if(q(d)){f.push(o.call(this,a,c,d,e))}return f}return{displayName:"Balata",mixins:[g.skinBasedComp,f.mixins.backgroundDetectionMixin],propTypes:b.defaults({id:a.PropTypes.string.isRequired,parentId:a.PropTypes.string.isRequired,compData:a.PropTypes.object,compDesign:a.PropTypes.object,compBehaviors:a.PropTypes.object,style:a.PropTypes.object,onClick:a.PropTypes.func,isDesktopDevice:c.Types.Device.isDesktopDevice.isRequired,isMobileView:c.Types.isMobileView.isRequired,designDataChangeAspect:c.Types.SiteAspects.designDataChangeAspect.isRequired,enableVideo:a.PropTypes.bool,notifyMediaState:a.PropTypes.func,setMediaAPI:a.PropTypes.func,mediaQuality:a.PropTypes.string},c.santaTypesUtils.getSantaTypesByDefinition(f.components.bgMedia),c.santaTypesUtils.getSantaTypesByDefinition(f.components.bgOverlay)),statics:{useSantaTypes:true},getInitialState:function(){return{transforms:{}}},componentWillReceiveProps:function(a){this.handleDesignDataBehaviors(a)},handleDesignDataBehaviors:function(a){var b=r(a);var c=r(this.props);this.setState({transforms:{}});if(c.id!==b.id){var d=this.props.designDataChangeAspect;d.notify(this.props.parentId,this.props.compDesign,a.compDesign)}},getSkinProperties:function(){var a=h.getBgEffectName(this.props.compBehaviors,this.props.isDesktopDevice,this.props.isMobileView);var c=s.call(this,this.props,this.state);var d=b.assign({position:"absolute",top:0,width:"100%",height:"100%",pointerEvents:a?"none":"auto"},this.props.style);return{"":{style:d,children:c,onClick:this.props.onClick,key:"balata_"+a}}},getDefaultSkinName:function(){return"skins.viewer.balata.balataBaseSkin"}}});