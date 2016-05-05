<%@ page contentType="text/json" %>
<%@ taglib prefix="s" uri="/struts-tags" %>  
<%--
  ~ eGov suite of products aim to improve the internal efficiency,transparency,
  ~    accountability and the service delivery of the government  organizations.
  ~
  ~     Copyright (C) <2015>  eGovernments Foundation
  ~
  ~     The updated version of eGov suite of products as by eGovernments Foundation
  ~     is available at http://www.egovernments.org
  ~
  ~     This program is free software: you can redistribute it and/or modify
  ~     it under the terms of the GNU General Public License as published by
  ~     the Free Software Foundation, either version 3 of the License, or
  ~     any later version.
  ~
  ~     This program is distributed in the hope that it will be useful,
  ~     but WITHOUT ANY WARRANTY; without even the implied warranty of
  ~     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  ~     GNU General Public License for more details.
  ~
  ~     You should have received a copy of the GNU General Public License
  ~     along with this program. If not, see http://www.gnu.org/licenses/ or
  ~     http://www.gnu.org/licenses/gpl.html .
  ~
  ~     In addition to the terms of the GPL license to be adhered to in using this
  ~     program, the following additional terms are to be complied with:
  ~
  ~         1) All versions of this program, verbatim or modified must carry this
  ~            Legal Notice.
  ~
  ~         2) Any misrepresentation of the origin of the material is prohibited. It
  ~            is required that all modified versions of this material be marked in
  ~            reasonable ways as different from the original version.
  ~
  ~         3) This license does not grant any rights to any user of the program
  ~            with regards to rights under trademark law for use of the trade names
  ~            or trademarks of eGovernments Foundation.
  ~
  ~   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
  --%>

{
"ResultSet": {
    "Result":[
    {
     "checkBudget":"<s:property value="%{checkBudget}" />",
     "showValidationMsg":"<s:property value="%{showValidationMsg}" />"
    }
    <s:if test="%{!coaList.isEmpty()}">
    ,
    	<s:iterator var="s" value="coaList" status="status">  
		    {"Text":"<s:property value="%{glcode}"/>-<s:property value="%{name}"/>",
		    "Value":"<s:property value="%{id}" />"
		    }<s:if test="!#status.last">,</s:if>
		</s:iterator>
	</s:if>	
		<s:iterator var="s1" value="assetList" status="status1">
		  <s:if test="#status1.first">,</s:if> 
		    {"AssetCode":"<s:property value="%{asset.code}"/>",
		    "AssetId":"<s:property value="%{asset.id}" />"
		    }<s:if test="!#status1.last">,</s:if>
		</s:iterator>
    ]
  }
}