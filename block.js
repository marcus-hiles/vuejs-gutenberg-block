( function( blocks, editor, i18n, element ) {
	var el = element.createElement;
	var __ = i18n.__;
    var RichText = editor.RichText;
    var setAttributes

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
	blocks.registerBlockType( 'infonaligy-blocks/basic-editable', {
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
            var vueAppIdAttr = 'basic-editable-' + props.id;

            var content = props.attributes.content;
            var title = props.attributes.title;
            var focus = props.focus;
            
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
	} );
} )(
    window.wp.blocks,
    window.wp.editor,
    window.wp.i18n,
    window.wp.element
);
