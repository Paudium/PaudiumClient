import React from 'react'
import NavBar from '../components/NavBar/MediaTopBar'
import MediaPlayer from '../components/MediaPlayer';
import Container from '@material-ui/core/Container';



export default function Player() {
    return (
        <Container>
            <MediaPlayer/>
        </Container>
    )
}
