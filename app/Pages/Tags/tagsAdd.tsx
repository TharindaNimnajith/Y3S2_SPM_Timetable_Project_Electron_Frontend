import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import routes from '../../constants/routes.json';
import styles from './tags.css';
import NavBar from '../../components/NavBar/NavBar';
import {setTags} from './tagsSlice';
import {proxy} from '../../conf'

let errors_: string = ''

const TagsAdd: React.FC = () => {
  const dispatch = useDispatch();

  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>('');
  const [tagToken, setTagToken] = useState<string>('');
  const [tagsObject, setTagsObject] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${proxy}/tags/getTags`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        const responseData = await response.json();
        setTagsObject(responseData.tags);
        dispatch(setTags(responseData.tags));
        console.log(responseData.tags);
        if (!responseData) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData().then(() => {
    });
  }, []);

  const handleSubmit = async (e: any) => {
    // e.preventDefault()
    if (name.trim() === '' && tagToken.trim() === '') {
      errors_ = 'Please enter a value for the tag name and tag token.'
      setError(true)
      setLoading(false)

    } else {
      if (name.trim() === '') {
        errors_ = 'Please enter a value for the tag name.'
        setError(true)
        setLoading(false)

      } else if (tagToken.trim() === '') {
        errors_ = 'Please enter a value for the tag token.'
        setError(true)
        setLoading(false)

      }

    }


    const finalObject = {
      name,
      tagToken
    };
    if (name.trim() !== '' && tagToken.trim() !== '') {
      setError(false)
      try {
        const response = await fetch(
          `${proxy}/tags/create`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObject)
          }
        );
        const responseData = await response.json();
        setRenderRedirectTo(true);
        if (!responseData) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const renderRedirect = () => {
    if (renderRedirectTo) {
      return <Redirect to={routes.TAGS_LIST_VIEW}/>;
    }
    return null;
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setName(e.target.value);
  };

  const handleChangeTagToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setTagToken(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: '#37474F',
        height: '100vh'
      }}>
      {renderRedirect()}
      <NavBar/>
      <Row className="text-center mb-5">
        <Col
          xs={12}
          md={12}
          className="p-3"
          style={{backgroundColor: '#343a40', color: '#fff'}}>
          <h3>Add Tag</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}>
        <div>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4} className="mt-auto">
              <p>Real Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={name}
                    onChange={handleChangeName}
                    placeholder="ex:- Lecture"/>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={4}>
              <p>Tag Name</p>
            </Col>
            <Col xs={3} md={3}>
              <Form className="">
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    style={{borderWidth: '2.5px'}}
                    value={tagToken}
                    onChange={handleChangeTagToken}
                    placeholder="ex:- Lec"/>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}/>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={3}/>
            <Col xs={3} md={7}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}>
                Add Tag
              </Button>
            </Col>
            <Col xs={12} md={2}/>
          </Row>
          {
            error && (
              <div style={{
                color: 'red',
                fontSize: '18px',
                marginTop: '7px',
                textAlign: 'center'
              }}>
                {errors_}
              </div>
            )
          }
        </div>
      </Container>

    </div>
  );
};

export default TagsAdd;
