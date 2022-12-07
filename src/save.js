import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();
	const { image, device } = attributes;
	return <div { ...blockProps }>
		{ image &&
		<div className="wp-block-device-frame ">
			<div className = {device + " frame"}>
				<div class="mask">
					<img src={image.url} alt="" class="screenshot" />
				</div>
			</div>
		</div>
		}
		</div>;
}
