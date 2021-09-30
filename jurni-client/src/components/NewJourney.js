import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap'

function NewJourney() {
    return (
        <div>
            <Form><FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
                <Form.Control type="text" placeholder="title" />
            </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Description" className="mb-3">
                    <Form.Control as="textarea" name="description" placeholder="Description" />
                </FloatingLabel>

                {['checkbox'].map((type) => (
                    <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                            type={type}
                            id={`default-${type}`}
                            label="Make public"
                        />
                    </div>
                )
                )}
            </Form>
        </div>
    )
}


export default NewJourney;