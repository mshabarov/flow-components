/*
 * Copyright 2000-2021 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.component.messages.testbench;

import java.util.List;

import com.vaadin.testbench.TestBenchElement;
import com.vaadin.testbench.elementsbase.Element;

/**
 * A TestBench element representing a <code>&lt;vaadin-message-list&gt;</code>
 * element.
 *
 * @author Vaadin Ltd.
 */
@Element("vaadin-message-list")
public class MessageListElement extends TestBenchElement {

    /**
     * Gets the <code>&lt;vaadin-message&gt;</code> elements rendered in this
     * message list.
     *
     * @return
     */
    public List<MessageElement> getMessageElements() {
        return $(MessageElement.class).all();
    }

}