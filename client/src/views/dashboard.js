import React from 'react';
import NavbarMenu from './navbar';
import { PostContextWrap } from '../contexts/PostContext'
import { AuthContext } from '../contexts/authContext';
import { useContext, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import Singlepost from '../components/singlePost';
import addIcon from '../assets/plus-circle-fill.svg'
import AddPostModal from '../components/AddPost';
import UpdatePostModal from '../components/UpdatePost';
const Dashboard = () => {
	const { state: { user }, } = useContext(AuthContext)
	const {
		postState: { postLists, postLoading },
		getPosts,
		setShow,
		isToast: { show, message, type },
		setShowToast
	} = useContext(PostContextWrap);
	// Start: Get all posts
	useEffect(() => getPosts(), [show])
	let body = null
	if (postLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (postLists.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {user}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome to LearnIt</Card.Title>
						<Card.Text>
							Click the button below to track your first skill to learn
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShow.bind(this, true)}
						>
							LearnIt!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
					{postLists.map(post => (
						<Col key={post._id} className='my-2'>
							<Singlepost post={post} />
						</Col>
					))}
				</Row>

				{/* Open Add Post Modal */}
				<OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add a new thing to learn</Tooltip>}
				>
					<Button
						className='btn-floating'
						onClick={setShow.bind(this, true)}
					>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
				</OverlayTrigger>
			</>
		)
	}
	return (
		<div>
			< NavbarMenu />
			{body}
			<AddPostModal />
			< UpdatePostModal />
			<Toast show={show} style={{ position: 'fixed', top: '20%', right: '10px' }} className={`bg-${type} text-white`} onClose={setShowToast.bind(this, {
				show: false,
				message: '',
				type: null
			})}
			delay={3000}
			autohide >
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</div>
	);
}

export default Dashboard;


