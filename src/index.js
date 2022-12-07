
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import metadata from './block.json';


registerBlockType( metadata.name, {
	edit: edit,
	save,
} );
