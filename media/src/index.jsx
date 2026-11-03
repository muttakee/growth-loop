import React from 'react';
import {registerRoot, Composition} from 'remotion';
import {Card, Reel, reelDuration} from './compositions.jsx';

// Placeholder props so the compositions open in the Remotion studio. Real props come from a
// post's "Media spec" (see media/README.md); nothing brand-specific is hardcoded here.
const demoStyle = {
	background: '#222222', text: '#FFFFFF', accent: '#FFAA00',
	fontMain: 'Noto Sans', fontLatin: 'Poppins',
	logo: null, logoPosition: 'bottom-right', photo: null, photoPosition: 'bottom-left',
};
const demoCard = {blocks: [{type: 'headline', text: 'Headline'}, {type: 'text', text: 'Sub-line with *accent*'}]};

const Root = () => (
	<>
		<Composition id="Card" component={Card} width={1080} height={1350} fps={30} durationInFrames={1}
			defaultProps={{style: demoStyle, card: demoCard, size: 'portrait'}}
			calculateMetadata={({props}) => (props.size === 'square' ? {width: 1080, height: 1080} : {})} />
		<Composition id="Reel" component={Reel} width={1080} height={1920} fps={30} durationInFrames={90}
			defaultProps={{style: demoStyle, scenes: [{start: 0, end: 3, blocks: demoCard.blocks}]}}
			calculateMetadata={({props}) => ({durationInFrames: reelDuration(props.scenes, 30)})} />
	</>
);

registerRoot(Root);
