import './editor.scss';

// Import other functionality.
import { BackgroundOptionsAttributes } from './attributes';
import { BackgroundOptionsClasses } from './classes';
import { BackgroundOptionsInlineStyles } from './inline-styles';
import { BackgroundOptionsVideoOutput } from './video';

// Export for ease of importing in individual blocks.
export {
	BackgroundOptionsAttributes,
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
};

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	ColorPalette,
	description,
	MediaUpload,
} = wp.blocks;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelColor,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 *
 * @param {string} value The string value of the saved attribute.
 */
export default class BackgroundOptions extends Component {
	onChangeBackgroundType = value => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundType: value } );
	};

	onChangeBackgroundImage = value => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundImage: value } );
	};

	onRemoveBackgroundImage = () => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundImage: null } );
	};

	onChangeBackgroundVideo = value => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundVideo: value } );
	};

	onRemoveBackgroundVideo = () => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundVideo: null } );
	};

	onChangeBackgroundColor = value => {
		const { setAttributes } = this.props;
		setAttributes( { backgroundColor: value } );
	};

	imageBackgroundSelect() {
		if ( 'image' !== this.props.attributes.backgroundType ) {
			return '';
		}

		let isImageBackground = '';

		if ( ! this.props.attributes.backgroundImage ) {
			const imageID = '',
				imageURL = '';

			isImageBackground =
				<div className="media-upload-wrapper">
					<p>
						<MediaUpload
							buttonProps={ {
								className: 'components-button button button-large',
							} }
							onSelect={ this.onChangeBackgroundImage }
							type="image"
							value={ imageID }
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									<Dashicon icon="format-image" /> { ! imageID ? __( 'Upload Image' ) : <img src={ imageURL } alt="" /> }
								</Button>
							) }
						/>
					</p>

					<p>
						<description>
							{ __( 'Add/Upload an image file. (1920x1080px .jpg, .png)' ) }
						</description>
					</p>
				</div>;
		} else {
			isImageBackground =
				<div className="image-wrapper">
					<p>
						<img
							src={ this.props.attributes.backgroundImage.url }
							alt={ this.props.attributes.backgroundImage.alt }
						/>
					</p>
					{ this.props.focus ? (
						<div className="media-button-wrapper">
							<p>
								<Button
									className="remove-image button button-large"
									onClick={ this.onRemoveBackgroundImage }
								>
									<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
								</Button>
							</p>

							<p>
								<description>
									{ __( 'Add/Upload an image file. (1920x1080px .jpg, .png)' ) }
								</description>
							</p>
						</div>
					) : null }
				</div>;
		}

		return isImageBackground;
	}

	videoBackgroundSelect() {
		if ( 'video' !== this.props.attributes.backgroundType ) {
			return '';
		}

		let isVideoBackground = '';

		if ( ! this.props.attributes.backgroundVideo ) {
			const videoID = '';

			isVideoBackground =
				<div className="media-upload-wrapper">
					<p>
						<MediaUpload
							buttonProps={ {
								className: 'components-button button button-large',
							} }
							onSelect={ this.onChangeBackgroundVideo }
							type="video"
							value={ videoID }
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									<Dashicon icon="format-video" /> { ! videoID ? __( 'Upload Video' ) : null }
								</Button>
							) }
						/>
					</p>

					<p>
						<description>
							{ __( 'Add/Upload a 1920x1080 .mp4 video file. Note: background videos are only supported on heroes.' ) }
						</description>
					</p>
				</div>;
		} else {
			isVideoBackground =
				<div className="video-wrapper">
					<p>
						<video
							className="video-container video-container-overlay"
						>
							<source
								type="video/mp4"
								src={ this.props.attributes.backgroundVideo.url }
							/>
						</video>
					</p>
					{ this.props.focus ? (
						<div className="media-button-wrapper">
							<p>
								<Button
									className="remove-video button button-large"
									onClick={ this.onRemoveBackgroundVideo }
								>
									<Dashicon icon="no-alt" /> { __( 'Remove Video' ) }
								</Button>
							</p>

							<p>
								<description>
									{ __( 'Add/Upload a 1920x1080 .mp4 video file. Note: background videos are only supported on heroes.' ) }
								</description>
							</p>
						</div>
					) : null }
				</div>;
		}

		return isVideoBackground;
	}

	colorPanelSelect() {
		if ( 'color' !== this.props.attributes.backgroundType ) {
			return '';
		}

		return <PanelColor
			title={ __( 'Background Color' ) }
			colorValue={ this.props.attributes.backgroundColor }
		>
			<ColorPalette
				value={ this.props.attributes.backgroundColor }
				onChange={ this.onChangeBackgroundColor }
			/>
		</PanelColor>;
	}

	render() {
		return (
			<PanelBody
				title={ __( 'Background Options' ) }
				className="wds-background-options"
			>
				<PanelRow>
					<SelectControl
						key="background-type"
						label={ __( 'Background Type' ) }
						value={ this.props.attributes.backgroundType ? this.props.attributes.backgroundType : '' }
						options={ [
							{
								label: __( 'None' ),
								value: '',
							},
							{
								label: __( 'Image' ),
								value: 'image',
							},
							{
								label: __( 'Video' ),
								value: 'video',
							},
							{
								label: __( 'Color' ),
								value: 'color',
							},
						] }
						onChange={ this.onChangeBackgroundType }
					/>
				</PanelRow>
				<PanelRow>
					{ this.imageBackgroundSelect() }
					{ this.videoBackgroundSelect() }
					{ this.colorPanelSelect() }
				</PanelRow>
			</PanelBody>
		);
	}
}