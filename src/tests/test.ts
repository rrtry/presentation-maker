import * as funcs from "./testFunctions";

describe('Presentation Editor Functions', () => {

    describe('addTextObject function', () => {
        const initialEditor = {
            presentation: {
                title: 'Test Presentation',
                slides: [
                    {
                        id: 'slide-1',
                        objects: [],
                        background: '#ffffff',
                    },
                ],
            },
            selection: null,
            objectId: null,
        };
    
        it('should add a new text object to the correct slide', () => {
            const updatedEditor = funcs.addTextObject(initialEditor, 'slide-1', 'New Text');
    
            // Check if the text object was added to the slide
            const slide = updatedEditor.presentation.slides.find((slide) => slide.id === 'slide-1');
            const newTextObject = slide?.objects.find((obj) => obj.type === 'text');
            expect(newTextObject).toBeDefined();
            expect(newTextObject?.text).toBe('New Text');
        });
    
        it('should not modify other slides', () => {
            const updatedEditor = funcs.addTextObject(initialEditor, 'slide-1', 'Another Text');
    
            // Ensure no other slides were modified
            const otherSlide = updatedEditor.presentation.slides.find((slide) => slide.id === 'slide-2');
            expect(otherSlide).toBeUndefined(); // there is no slide-2 initially
        });
    });
    
    describe('addImageObject function', () => {
        const initialEditor = {
            presentation: {
                title: 'Test Presentation',
                slides: [
                    {
                        id: 'slide-1',
                        objects: [],
                        background: '#ffffff',
                    },
                ],
            },
            selection: null,
            objectId: null,
        };
    
        it('should add a new image object to the correct slide', () => {
            const updatedEditor = funcs.addImageObject(initialEditor, 'slide-1', 'base64image');
    
            // Check if the image object was added to the slide
            const slide = updatedEditor.presentation.slides.find((slide) => slide.id === 'slide-1');
            const newImageObject = slide?.objects.find((obj) => obj.type === 'image');
            expect(newImageObject).toBeDefined();
            expect(newImageObject?.src).toBe('base64image');
        });
    
        it('should not modify other slides', () => {
            const updatedEditor = funcs.addImageObject(initialEditor, 'slide-1', 'anotherBase64image');
    
            // Ensure no other slides were modified
            const otherSlide = updatedEditor.presentation.slides.find((slide) => slide.id === 'slide-2');
            expect(otherSlide).toBeUndefined(); // there is no slide-2 initially
        });
    });

    // Test for changePresentationTitle
    it('should change the title of the presentation', () => {
        const initialState = {
            presentation: { title: 'Old Title', slides: [] },
            selection: null,
            objectId: null,
        };

        const newState = funcs.changePresentationTitle(initialState, 'New Title');
        expect(newState.presentation.title).toBe('New Title');
    });

    // Test for addSlide
    it('should add a new slide to the presentation', () => {
        const initialState = {
            presentation: { title: 'Presentation', slides: [] },
            selection: null,
            objectId: null,
        };

        const newState = funcs.addSlide(initialState);
        expect(newState.presentation.slides.length).toBe(1);
        expect(newState.presentation.slides[0].objects.length).toBe(0); // No objects by default
    });

    // Test for removeSlide
    it('should remove the slide with the specified ID', () => {
        const initialState = {
            presentation: {
                title: 'Presentation',
                slides: [
                    { id: 'slide1', objects: [], background: '#fff' },
                    { id: 'slide2', objects: [], background: '#000' },
                ],
            },
            selection: { selectedSlideId: 'slide1' },
            objectId: null,
        };

        const newState = funcs.removeSlide(initialState, 'slide1');
        expect(newState.presentation.slides.length).toBe(1);
        expect(newState.presentation.slides[0].id).toBe('slide2');
    });

    // Test for moveSlide
    it('should move a slide to a new index', () => {
        const initialState = {
            presentation: {
                title: 'Presentation',
                slides: [
                    { id: 'slide1', objects: [], background: '#fff' },
                    { id: 'slide2', objects: [], background: '#000' },
                ],
            },
            selection: { selectedSlideId: 'slide1' },
            objectId: null,
        };

        const newState = funcs.moveSlide(initialState, 'slide1', 1);
        expect(newState.presentation.slides[1].id).toBe('slide1');
    });

    // Test invalid moveSlide
    it('should return the same state if the new index is invalid', () => {
        const initialState = {
            presentation: {
                title: 'Presentation',
                slides: [
                    { id: 'slide1', objects: [], background: '#fff' },
                    { id: 'slide2', objects: [], background: '#000' },
                ],
            },
            selection: { selectedSlideId: 'slide1' },
            objectId: null,
        };

        const newState = funcs.moveSlide(initialState, 'slide1', -1);
        expect(newState).toBe(initialState);
    });
});

