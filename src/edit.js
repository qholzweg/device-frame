import { PanelBody, Button, ResponsiveWrapper, Spinner, SelectControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
const ALLOWED_MEDIA_TYPES = [ 'image' ];

class ImageSelectorEdit extends Component {
	render() {
		const { attributes, setAttributes, bgImage, className } = this.props;
		const { imageId, device } = attributes;
		const instructions = <p>{ __( 'To edit the image, you need permission to upload media.', 'device-frame' ) }</p>;

		if ( bgImage && bgImage.source_url ) {
			setAttributes( {
				imageUrl: bgImage.source_url,
			} );
		}

		const onUpdateImage = ( image ) => {
			setAttributes( {
				imageId: image.id,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				imageId: undefined,
				imageUrl: undefined,
			} );
		};

		const setDevice = (device) => {
			setAttributes( {
				device: device,
			} );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Device frame settings', 'device-frame' ) }
						initialOpen={ true }
					>
						<div className="wp-block-device-frame-settings">
						<SelectControl
								label="Select device type"
								value={ device }
								options={ [
										{ label: 'Iphone', value: 'iphone' },
										{ label: 'Ipad (vertical)', value: 'ipad-v' },
										{ label: 'Ipad (horizontal)', value: 'ipad-h' },
								] }
								onChange={ ( device ) => setDevice( device ) }
								__nextHasNoMarginBottom
						/>
							<MediaUploadCheck fallback={ instructions }>
								<MediaUpload
									title={ __( 'Screen image', 'device-frame' ) }
									onSelect={ onUpdateImage }
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									value={ imageId }
									render={ ( { open } ) => (
										<Button
											className={ ! imageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
											onClick={ open }>
											{ ! imageId && ( __( 'Set screen image', 'device-frame' ) ) }
											{ !! imageId && ! bgImage && <Spinner /> }
											{ !! imageId && bgImage &&
												<ResponsiveWrapper
													naturalWidth={ bgImage.media_details.width }
													naturalHeight={ bgImage.media_details.height }
												>
													<img src={ bgImage.source_url } alt={ __( 'Screen image', 'device-frame' ) } />
												</ResponsiveWrapper>
											}
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ !! imageId && bgImage &&
								<MediaUploadCheck>
									<MediaUpload
										title={ __( 'Screen image', 'device-frame' ) }
										onSelect={ onUpdateImage }
										allowedTypes={ ALLOWED_MEDIA_TYPES }
										value={ imageId }
										render={ ( { open } ) => (
											<Button onClick={ open } isDefault isLarge>
												{ __( 'Replace screen image', 'device-frame' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							}
							{ !! imageId &&
								<MediaUploadCheck>
									<Button onClick={ onRemoveImage } isLink isDestructive>
										{ __( 'Remove screen image', 'device-frame' ) }
									</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</InspectorControls>
				
				{ bgImage && bgImage.source_url &&
				<div className="wp-block-device-frame ">
					<div className = {device + " frame"}>
						<div class="mask">
							<img src={bgImage.source_url} alt="" class="screenshot" />
						</div>
					</div>
				</div>
				}
			</Fragment>
		);
	}
}

export default compose(
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { imageId } = props.attributes;

		return {
			bgImage: imageId ? getMedia( imageId ) : null,
		};
	} ),
)( ImageSelectorEdit );