/**
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package org.openmrs.module.muzima.api.db.hibernate;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.openmrs.module.muzima.api.db.QueueDataDao;
import org.openmrs.module.muzima.model.QueueData;

import java.util.List;

/**
 */
public class HibernateQueueDataDao extends HibernateDataDao<QueueData> implements QueueDataDao {

    private final Log log = LogFactory.getLog(HibernateQueueDataDao.class);

    /**
     * Default constructor.
     */
    protected HibernateQueueDataDao() {
        super(QueueData.class);
    }

    @Override
    public List<Object[]> queueDataCountGroupedByDiscriminator() {
        Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(QueueData.class);
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.groupProperty("discriminator"));
        projectionList.add(Projections.rowCount());
        criteria.setProjection(projectionList);
        List<Object[]> results = criteria.list();

        return results;
    }
}
