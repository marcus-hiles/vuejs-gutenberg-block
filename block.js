( function( blocks, editor, i18n, element ) {
	
    let el = element.createElement;
    let __ = i18n.__;
    let RichText = editor.RichText;
    let setAttributes

    Vue.customElement( 'basic-editable', {
        props: [
            'title',
            'content',
        ],
        data: function () {
            return {
                edit_content: '',
                edit_title: ''
            }
        },
        watch: {
            edit_content: function (v) {
              setAttributes({ content:v});
            },
            edit_title: function (v) {
                setAttributes({ title:v});
              }
        },
        created(){
            this.edit_content = this.content
            this.edit_title = this.title
        },
        template: `
            <div>
                <div><p>Title: {{edit_title}}</p><input v-model="edit_title" /></div>
                <div><p>Content: {{edit_content}}</p><input v-model="edit_content" /></div>
            </div>
        `
    } );
	blocks.registerBlockType( 'marcushiles-blocks/basic-editable', {
		title: __( 'Example: Editable' ),
		icon: 'universal-access-alt',
		category: 'layout',

		attributes: {
			content: {
				type: 'string',
				source: 'children',
				selector: 'p',
			},
			content: {
				type: 'array',
				source: 'children',
				selector: 'p',
			},
        },
        
		edit: function( props ) {
            let vueAppIdAttr = `basic-editable-${props.id}`;

            let content = props.attributes.content;
            let title = props.attributes.title;
            let focus = props.focus;
            
            setAttributes = props.setAttributes
			
            return el(
                'basic-editable',
                {
                    className: props.className,
                    content: content,
                    title: title,
                    id: vueAppIdAttr,
                }
            )

		},

		save: function( props ) {
            return el( 'div', { className: 'components-block-description' },
            el( RichText.Content, {
                    tagName: 'p', value: props.attributes.title
                } ),
            el( RichText.Content, {
                    tagName: 'p', value: props.attributes.content
                } ),
          )
		}
	});
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element
);
