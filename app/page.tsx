"use client"
import Form from './components/Form';
import {useResource} from './components/useResource';

export default function MainPage() {
const {createResource} = useResource()
  return <Form onSubmit={createResource}/>;
}