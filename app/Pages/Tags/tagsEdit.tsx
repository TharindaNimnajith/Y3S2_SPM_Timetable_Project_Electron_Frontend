import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './tags.css';
import routes from '../../constants/routes.json';
import NavBar from '../../components/NavBar/NavBar';
import {setEditingTag, setEditingTagId, setEditTag} from './tagsSlice';
import {proxy} from '../../conf'

let errors_: string = ''

const TagsEdit: React.FC = () => {
  const dispatch = useDispatch();

  const editingTagId = useSelector(
    (state: {
      tags: any
      editingTagId: string
    }) => state.tags.editingTagId
  );

  const editingTag = useSelector(
    (state: {
      tags: any
      editingTagId: any
    }) => state.tags.editingTag
  );

  const [tag, setTag] = useState<{
    name: string,
    tagToken: string
  }>({
    name: editingTag.name,
    tagToken: editingTag.tagToken
  });
  const [renderRedirectTo, setRenderRedirectTo] = useState<boolean | null>(false);
  const [id, setId] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setId(editingTagId);
  }, []);

  const handleSubmit = async () => {
    console.log(id);

    if (tag.name.trim() === '' && tag.tagToken.trim() === '') {
      errors_ = 'Please enter a value for the tag name and tag token.'
      setError(true)
    } else {
      if (tag.name.trim() === '') {
        errors_ = 'Please enter a value for the tag name.'
        setError(true)
      } else if (tag.tagToken.trim() === '') {
        errors_ = 'Please enter a value for the tag token.'
        setError(true)
      }
    }

    const finalObjectWithID = {
      tags: tag,
      id: id
    };

    console.log(finalObjectWithID);
    if (tag.name.trim() !== '' && tag.tagToken.trim() !== '') {
      setError(false)

      try {
        const response = await fetch(
          `${proxy}/tags/editTags`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalObjectWithID)
          }
        );
        const responseData = await response.json();
        setRenderRedirectTo(true);
        dispatch(setEditTag(false));
        dispatch(setEditingTagId(''));
        dispatch(setEditingTag(null));
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
    setTag({...tag, name: e.target.value});
  };

  const handleChangeTagToken = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setTag({...tag, tagToken: e.target.value});
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
          style={{backgroundColor: '#343a40', color: '#fff'}}
        >
          <h3>Edit Tag</h3>
        </Col>
      </Row>
      <Container
        className={`mt-2 p-4 mb-5 ${styles.tagsTopWrapper}`}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          color: 'white'
        }}
      >


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
                    value={tag.name}
                    onChange={handleChangeName}
                    placeholder="ex:- Lecture"
                  />


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
                    value={tag.tagToken}
                    onChange={handleChangeTagToken}
                    placeholder="ex:- Lec"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3} md={3}></Col>
          </Row>
          <Row className="mt-3 mb-3 justify-content-md-center">
            <Col xs={12} md={3}/>
            <Col xs={3} md={7}>
              <Button
                style={{width: '160px', fontSize: '1.3em'}}
                onClick={handleSubmit}
              >
                Edit Tag
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

export default TagsEdit;
