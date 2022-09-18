export default {
    translation: {
        login: {
            username: 'Username',
            password: 'Password',
            submitButton: 'Submit',
            signup: 'Get a pass to the station.',
            newToChat: 'New here? ',
            header: 'Sign in',
            errors: {
                username: 'Username is required',
                password: 'Password is required',
                authFailed: 'Invalid username or password',
            }
        },
        logout: 'Log out',
        signup: {
            username: 'Username',
            password: 'Password',
            confirm: 'Confirm password',
            submitButton: 'Submit',
            header: 'Sign up',
            errors: {
                username: 'Username is required',
                usernameMinLength: 'Username must be at least 3 characters long',
                usernameMaxLength: 'Username must be at most 20 characters long',
                password: 'Password is required',
                passwordMinLength: 'Password must be at least 6 characters long',
                confirm: 'Passwords must match',
                alreadyExists: 'User already exists',
            }
        },
        chat: {
            channels: 'Channels',
            renameChannelItem: 'Rename',
            removeChannelItem: 'Remove',
            editChannel: 'Edit the channel',
            sendMessageButton: 'Send the message',
            messagesCount: 'Overall messages: {{count}}',
            newMessagePlaceholder: 'Type in a message...',
            newMessageAriaLabel: 'New message',
        },
        notFound: {
            header: 'It seems you are lost',
            message: 'You\'d better ',
            linkText: 'Go Home',
        },
        errors: {
            network: 'Network error',
            unknown: 'Something went wrong',
        },
        notifications: {
            authSuccess: 'Glad to see you, {{username}}!',
            addChannelSuccess: 'Channel successfully added!',
            updateChannelSuccess: 'Channel successfully updated!',
            removeChannelSuccess: 'Channel successfully removed!',
        },
        modals: {
            addChannelHeader: 'Add a channel',
            addChannelPlaceholder: 'Channel\'s name',
            renameChannelHeader: 'Rename the channel',
            renameChannelPlaceholder: 'New channel\'s name',
            removeChannelHeader: 'Remove the channel',
            removeChannelButton: 'Remove',
            removeChannelBody: 'Are you sure you want to delete this channel?',
            cancelButton: 'Cancel',
            submitButton: 'Submit',
            errors: {
                required: 'Name is required',
                alreadyExists: 'Channel already exists',
                minLength: 'Name must be at least 3 characters long',
                maxLength: 'Name must be at most 20 characters long',
            }
        },
    }
}
