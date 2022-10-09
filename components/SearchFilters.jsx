import { useEffect, useState } from 'react';
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';

import { filterData, getFilterValues } from '../utils/fliterData';

const SearchFilters = () => {

    const [filters, setFilters] = useState({});
    
    const router = useRouter();

    const searchProperties = (filterValues) => {
        const path = router.pathname;
        const { query } = router;

        const values = getFilterValues(filterValues);

        values.forEach(value => {
            query[value.name] = value.value
        })

        router.push({ pathname: path, query });
    }

    return (
        <Flex bg="gray.400" p="4" justifyContent="center" flexWrap="wrap">
            {
                filterData.map(filter => (
                    <Box key={filter.queryName}>
                        <Select 
                            placeholder={filter.placeholder}
                            w="fit-content"
                            p="2"
                            onChange={(e) => searchProperties({ [filter.queryName]: e.target.value })}
                        >
                            {
                                filter.items.map(item =>( 
                                    <option value={item.value} key={item.value}>
                                        {item.name}
                                    </option>
                                ))
                            }
                        </Select>
                    </Box>
                ))
            }
        </Flex>
    )
}

export default SearchFilters