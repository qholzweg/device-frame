import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { imageUrl, device } = attributes;
	return <div { ...blockProps }>
		{ imageUrl &&
		<div className="wp-block-device-frame ">
			<div className = {device + " frame"}>
				<div class="mask">
					<img src={imageUrl} alt="" class="screenshot" />
				</div>
			</div>
		</div>
		}
		</div>;
}
