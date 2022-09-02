import { useContext } from 'react';

import { ApiContext, AuthContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => useContext(ApiContext);
