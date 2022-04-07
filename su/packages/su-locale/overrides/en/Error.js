Ext.define('SU.locale.en.Error', {
    override: 'SU.Error',
    statics: {
        locales: {
            DOM_UNKNOWN: 'Unknown Exception Code ({0})',
            DOM_INDEX_SIZE_ERR: 'Index out of bounds',
            DOM_STRING_SIZE_ERR: 'The resulting string is too long to fit in a DOMString',
            DOM_HIERARCHY_REQUEST_ERR: 'The Node can not be inserted at this location',
            DOM_WRONG_DOCUMENT_ERR: 'The source and the destination Documents are not the same',
            DOM_INVALID_CHARACTER_ERR: 'The string contains an invalid character',
            DOM_NO_DATA_ALLOWED_ERR: 'This Node / NodeList does not support data',
            DOM_NO_MODIFICATION_ALLOWED_ERR: 'This object cannot be modified',
            DOM_NOT_FOUND_ERR: 'The item cannot be found',
            DOM_NOT_SUPPORTED_ERR: 'This implementation does not support function',
            DOM_INUSE_ATTRIBUTE_ERR: 'The Attribute has already been assigned to another Element',
            DOM_INVALID_STATE_ERR: 'The object is no longer usable',
            DOM_SYNTAX_ERR: 'An invalid or illegal string was specified',
            DOM_INVALID_MODIFICATION_ERR: 'Cannot change the type of the object',
            DOM_NAMESPACE_ERR: 'The namespace declaration is incorrect',
            DOM_INVALID_ACCESS_ERR: 'The object does not support this function',
            DOM_VALIDATION_ERR: 'The operation would cause the node to fail validation.',
            DOM_TYPE_MISMATCH_ERR: 'The node type is incompatible with the expected parameter type.',
            DOM_SECURITY_ERR: 'The operation is not allowed due to same origin policy restriction.',
            DOM_NETWORK_ERR: 'A network error occurred.',
            DOM_ABORT_ERR: 'The user aborted an operation.',
            DOM_URL_MISMATCH_ERR: 'The specified URL does not match.',
            DOM_QUOTA_EXCEEDED_ERR: 'The operation would exceed storage limits.'
        }
    }
});
