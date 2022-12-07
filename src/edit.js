import { PanelBody, Button, ResponsiveWrapper, Spinner, SelectControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { InspectorControls, useBlockProps , MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
const ALLOWED_MEDIA_TYPES = [ 'image' ];

export default function edit( { attributes, setAttributes } ) {
		const { image, device } = attributes;
		const instructions = <p>{ __( 'To edit the image, you need permission to upload media.', 'device-frame' ) }</p>;

		const onUpdateImage = ( image ) => {
			setAttributes( {
				image: image,
			} );
		};

		const onRemoveImage = () => {
			setAttributes( {
				image: undefined,
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
									onSelect={ (image) => onUpdateImage(image) }
									allowedTypes={ ALLOWED_MEDIA_TYPES }
									value={ image }
									render={ ( { open } ) => (
										<Button
											className={ ! image ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
											onClick={ open }>
											{ ! image && ( __( 'Set screen image', 'device-frame' ) ) }
											{ !! image &&
												<ResponsiveWrapper
													naturalWidth={ image.width }
													naturalHeight={ image.height }
												>
													<img src={ image.url } alt={ __( 'Screen image', 'device-frame' ) } />
												</ResponsiveWrapper>
											}
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ !! image &&
								<MediaUploadCheck>
									<MediaUpload
										title={ __( 'Screen image', 'device-frame' ) }
										onSelect={ (image) => onUpdateImage(image) }
										allowedTypes={ ALLOWED_MEDIA_TYPES }
										value={ image.id }
										render={ ( { open } ) => (
											<Button onClick={ open } isDefault isLarge>
												{ __( 'Replace screen image', 'device-frame' ) }
											</Button>
										) }
									/>
									<Button onClick={ onRemoveImage } isLink isDestructive>
										{ __( 'Remove screen image', 'device-frame' ) }
									</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</InspectorControls>
				
				{ image &&
				<div { ...useBlockProps() }>
				<div className="wp-block-device-frame ">
					<div className = {device + " frame"}>
						<div class="mask">
							<img src={image.url} alt="" class="screenshot" />
						</div>
					</div>
				</div>
				</div>
				}
				{ !image &&
				<div { ...useBlockProps() }>
				<div className="wp-block-device-frame ">
					<div className = {"iphone frame"}>
					</div>
				</div>
				</div>
				}
			</Fragment>
		);
}